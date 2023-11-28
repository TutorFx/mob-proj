import { Prisma, PrismaClient } from '@prisma/client'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { getServerSession } from '@/server/utils/auth'
import { useSchemas } from '~/composables/useSchemas'
import { getPlan } from '~/server/utils/plan'
const prisma = new PrismaClient()
const { createBusinessSchema } = useSchemas

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const session = getServerSession(event)
  try {
    createBusinessSchema.parse(body)
  } catch (error) {
    if (error instanceof ZodError) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `${fromZodError(error)}`
        })
      )
    } else {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: 'Unknown Error'
        })
      )
    }
  }
  if (session?.user?.email == null) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Invalid session'
      })
    )
  }
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
      include: {
        _count: {
          select: {
            business: true
          }
        }
      }
    })

    if (!getUser) {
      return sendError(
        event,
        createError({
          statusCode: 401,
          statusMessage: 'Your account wasn\'t found'
        })
      )
    }

    if (getUser?._count.business + 1 > getPlan(getUser.plan).business_amount) {
      return sendError(
        event,
        createError({
          statusCode: 426,
          statusMessage: `Max businesses exceeded (${getPlan(getUser.plan).business_amount}), upgrade required.`
        })
      )
    }

    delete body.OwnerId
    const newBusiness = await prisma.business.create({
      data: {
        OwnerId: getUser.id,
        ...body
      }
    })

    return newBusiness
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
    // The .code property can be accessed in a type-safe manner
    {
      return sendError(
        event,
        createError({
          statusCode: 204,
          statusMessage: 'Nao pode fazer entrada'
        })
      )
    }

    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'bugou'
      })
    )
  }
})

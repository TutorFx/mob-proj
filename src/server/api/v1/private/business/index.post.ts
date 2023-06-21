import { getServerSession } from '#auth'
import { Prisma, PrismaClient } from '@prisma/client';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { useSchemas } from "~/composables/useSchemas"
const prisma = new PrismaClient()
const { createBusinessSchema } = useSchemas;

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const session = await getServerSession(event)
  try {
    createBusinessSchema.parse(body)
  } catch (error) {
    if (error instanceof ZodError)
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `${fromZodError(error)}`,
        })
      );
    else
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: 'Unknown Error',
        })
      );
  }
  if (session?.user?.email == null) return sendError(
    event,
    createError({
      statusCode: 500,
      statusMessage: 'Bad news, server error'
    })
  );
  try {
    const getUser = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      }
    })

    if (!getUser) return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'Bad news, your account wasnt found'
      })
    );
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
      return sendError(
        event,
        createError({
          statusCode: 204,
          statusMessage: 'Nao pode fazer entrada'
        })
      );


    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'bugou'
      })
    );
  }
})
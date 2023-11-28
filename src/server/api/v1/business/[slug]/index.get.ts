import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug
  try {
    return await prisma.business.findUnique({
      where: {
        slug
      }
    })
  } catch (error) {
    console.log(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
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

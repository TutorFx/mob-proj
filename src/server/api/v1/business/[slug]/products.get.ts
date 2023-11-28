import { Prisma, PrismaClient } from '@prisma/client'
import sanitizeHtml from 'sanitize-html'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug
  try {
    return (await prisma.business.findUnique({
      where: {
        slug
      },
      select: {
        Products: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            images: {
              select: {
                id: true,
                Key: true
              }
            }
          },
          orderBy: { updatedAt: 'desc' }
        }
      }
    }))?.Products.map(e => ({
      ...e,
      slug: encodeURIComponent(e.name),
      description: sanitizeHtml(e.description).replace(/<[^>]+>/g, '')
    }))
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return sendError(
        event,
        createError({
          statusCode: 204,
          statusMessage: 'Nao pode fazer entrada'
        })
      )
    }

    console.log(error)
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'bugou'
      })
    )
  }
})

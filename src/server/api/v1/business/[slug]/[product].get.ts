import { Prisma, PrismaClient } from '@prisma/client'
import { ZodError, z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import sanitizeHtml from 'sanitize-html'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // @ts-expect-error
    const { slug, product } = event.context.params
    const nameSchema = z.string().min(1)
    const slugSchema = z.string().min(1)
    type IName = z.infer<typeof nameSchema>;
    type ISlug = z.infer<typeof slugSchema>;
    nameSchema.parse(product)
    slugSchema.parse(slug)
    console.log(decodeURI(decodeURIComponent(product)), slug)

    const response = await prisma.product.findFirst({
      where: {
        name: decodeURI(decodeURIComponent(product)),
        Business: {
          slug
        }
      },
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
      }
    })
    if (!response) { return sendError(event, createError({ statusCode: 404, statusMessage: 'Produto nao encontrado' })) }
    return {
      ...response, description: sanitizeHtml(response.description)
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `${fromZodError(error)}`
        })
      )
    }
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

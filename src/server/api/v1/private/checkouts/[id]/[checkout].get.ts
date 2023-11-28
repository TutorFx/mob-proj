import { PrismaClient } from '@prisma/client'
import { useSchemas } from '@/composables/useSchemas'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const checkout = event.context.params?.checkout
  const { uuid } = useSchemas
  try {
    uuid.parse(id)
    uuid.parse(checkout)

    if (!id) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: 'invalid business id'
        })
      )
    }

    if (!checkout) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: 'invalid checkout id'
        })
      )
    }

    const orders = await prisma.order.findUnique({
      where: {
        id: checkout
      },
      include: {
        contact: true,
        address: true,
        ProductOnOrder: {
          include: {
            product: {
              include: { images: { take: 1 } }
            }
          }
        },
        Business: { include: { Image: true } }
      }
    })

    if (orders?.businessId !== id) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: 'Business not found'
        }))
    }

    return orders
  } catch (error) {
    console.log(error)
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Businesses not found'
      })
    )
  }
})

import { PrismaClient } from '@prisma/client'
import { useSchemas } from '@/composables/useSchemas'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const { uuid } = useSchemas
  try {
    uuid.parse(id)
    const getBusiness = await prisma.business.findUnique({
      where: {
        id
      },
      include: {
        Image: true,
        Address: true
      }
    })

    return getBusiness
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Businesses not found'
      })
    )
  }
})

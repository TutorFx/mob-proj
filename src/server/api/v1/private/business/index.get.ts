import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  try {
    const getBusiness = await prisma.business.findMany({
      where: {
        OwnerId: user.id
      }
    })

    if (getBusiness.length == 0) return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Business not found'
      })
    );

    return getBusiness

  } catch (error) {  
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Businesses not found'
      })
    );
  }
})
import { PrismaClient } from '@prisma/client';
import { useSchemas } from '@/composables/useSchemas';
import { z } from 'zod'
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const { uuid } = useSchemas
  const query = getQuery(event)
  try {
    z.string().optional().parse(query.status)
    z.string().optional().parse(query.search)
    uuid.parse(id);
    const orders = await prisma.order.findMany({
      where: {
        businessId: id,
        // @ts-expect-error
        status: query?.status,
        OR: [{
          contact: {
            // @ts-expect-error
            nome: {
              contains: query.search,
              mode: 'insensitive',
            }
          }
        },
        {
          // @ts-expect-error
          id: query.search
        }],
      },
      select: {
        contact: {
          select: {
            nome: true
          }
        },
        id: true,
        status: true,
        createdAt: true,
        //address: true,
        ProductOnOrder: {
          select: {
            quantity: true,
            product: {
              select: { 
                price: true,
                name: true,
                images: { 
                  take: 1, 
                  select: { Key: true } 
                } 
              }
            }
          }
        },
        Business: { select: { Image: { select: { Key: true } } } },
      },
      orderBy: { createdAt: 'desc' }
    })

    return orders

  } catch (error) {
    console.log(error)
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Businesses not found'
      })
    );
  }
})
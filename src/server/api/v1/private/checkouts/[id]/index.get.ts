import { PrismaClient } from '@prisma/client';
import type { z } from 'zod';
import { useSchemas } from '@/composables/useSchemas';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const { uuid } = useSchemas
  type IGetCheckout = z.infer<typeof useSchemas.getCheckout>;
  const query = getQuery<IGetCheckout>(event)
  try {
    useSchemas.getCheckout.parse(query)
    uuid.parse(id);
    const orders = await prisma.order.findMany({
      where: {
        businessId: id,
        status: query.status,
        OR: [{
          contact: {
            nome: {
              contains: query.search,
              mode: 'insensitive',
            }
          }
        },
        {
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
        // address: true,
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
import { PrismaClient, Prisma } from '@prisma/client';
import { sendError } from "h3";
import { z, ZodError } from 'zod';
import { useSchemas } from "~/composables/useSchemas"
import { fromZodError } from 'zod-validation-error';
import { IContact, ICart, IAddress } from '~/types/cart';
const { contact, address, cart } = useSchemas;

//TODO: Validate if the product is from this business

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  // @ts-expect-error
  const { slug } = event.context.params;
  // @ts-expect-error
  const { id } = event.context.params;
  if (!slug) return sendError(
    event,
    createError({
      statusCode: 400,
      statusMessage: 'Slug inválido',
    })
  );
  if (!id) return sendError(
    event,
    createError({
      statusCode: 400,
      statusMessage: 'id inválido',
    })
  );

  try {

    const order = await prisma.order.findUnique({
      where: {
        id,
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
        Business: { include: { Image: true } },
      }
    });

    if (order?.Business.slug !== slug) return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Pedido inválido',
      })
    );

    return order;

  } catch (error) {
    console.log(error)
    if (error instanceof ZodError)
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `${fromZodError(error)}`,
        })
      );
  }
});
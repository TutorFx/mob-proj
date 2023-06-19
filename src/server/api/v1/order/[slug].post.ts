import { PrismaClient, Prisma } from '@prisma/client';
import { sendError } from "h3";
import { z, ZodError } from 'zod';
import { useSchemas } from "~/composables/useSchemas"
import { fromZodError } from 'zod-validation-error';
import { IContact, ICart, IAddress } from '~/types/cart';
import { getServerSession } from '#auth';
const { contact, address, cart } = useSchemas;

//TODO: Validate if the product is from this business

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const body = await readBody(event);

  // @ts-expect-error
  const { slug } = event.context.params;
  if (!slug) return sendError(
    event,
    createError({
      statusCode: 400,
      statusMessage: 'Slug inválido',
    })
  );

  try {
    const session = await getServerSession(event);
    contact.parse(body.contact);
    address.parse(body.address);
    cart.parse(body.cart);
    //@ts-expect-error
    const userId = session?.id;
    const { contact: contData, address: addrData, cart: cartData }: { contact: IContact, address: IAddress, cart: ICart } = body;
    const createdOrder = await prisma.order.create({
      data: {
        Business: { connect: { slug } },
        userId,
        ProductOnOrder: {
          create: cartData
        },
        address: {
          create: {
            ...addrData,
            userId,
          }
        },
        contact: {
          create: {
            ...contData,
            userId,

          }
        }
      },
      include: {
        contact: true,
        address: true,
        ProductOnOrder: true
      }
    });
    if (createdOrder.addressId){
      await prisma.address.update({
        where: { id: createdOrder.addressId },
        data: {
          orderId: createdOrder.id
        }
      })
    }

    return createdOrder;
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
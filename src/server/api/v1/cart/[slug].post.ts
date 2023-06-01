import { Prisma, PrismaClient, Product, Image } from '@prisma/client';
import { ZodError, z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { useSchemas } from '~/composables/useSchemas';

const prisma = new PrismaClient()
const { cart } = useSchemas;
type ICart = z.infer<typeof cart>;
type IProductCart = Array<TItem & Product & {totalprice: number} & {images?: Image[]}>
export default defineEventHandler(async (event) => {

  try {
    // @ts-ignore
    const { slug } = event.context.params;

    const body = await readBody(event);
    cart.parse(body);

    const ids = body.map((item: TItem) => item.id)
    const products = (await prisma.product.findMany({
      where: {
        Business: {
          slug
        },
        id: {
          in: ids
        }
      },
      include: {
        images: {
          select: {
            secure_url: true
          },
          take: 1
        }
      }
    })).map((item) => {
      const cartitem = body?.find((record: TItem) => record.id == item.id)
      const totalprice = cartitem.quantity * item.price
      return ({
        ...item, ...cartitem, totalprice
      })
    }) as IProductCart

    const pricesum = products.reduce((accumulator, item) => {
      return accumulator + item.totalprice
    },0)
    const quantitysum = products.reduce((accumulator, item) => {
      return accumulator + item.quantity
    },0)
    return { items: products, info:{ pricesum, quantitysum }}

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
      return sendError(
        event,
        createError({
          statusCode: 204,
          statusMessage: 'Nao pode fazer entrada'
        })
      )

    console.log(error)
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'bugou'
      })
    );
  }
})
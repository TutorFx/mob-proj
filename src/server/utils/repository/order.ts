import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const OrderQuery = {
  include: {
    contact: true,
    address: true,
    ProductOnOrder: {
      include: {
        product: {
          include: { images: { take: 1 } },
        },
      },
    },
    Business: { include: { Image: true } },
  },
};

/**
 * Function to get order by ID
 * @async
 * @param {Record<string, string> | undefined} params - parameters to pass to the method
 * @throws {Error} Throws an error if the requested order could not be found.
 * @return {Promise<IOrder>} - return a promise that resolves to an order
 */
export const getOrderByID = async (
  params: Record<string, string> | undefined,
) => {
  useSchemas.validateBusiness.parse(params);
  const { id, slug } = params as IUseSchemas["validateBusiness"];

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    ...OrderQuery,
  });

  if (order?.Business.slug !== slug)
    throw new Error("Não foi possível solicitar pedido");

  return order;
};

export type IOrder = Prisma.OrderGetPayload<typeof OrderQuery>;

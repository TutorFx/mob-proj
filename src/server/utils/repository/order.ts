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

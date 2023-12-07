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

const OrderWithFilterQuery = {
  select: {
    contact: {
      select: {
        nome: true,
      },
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
              select: { Key: true },
            },
          },
        },
      },
    },
    Business: { select: { Image: { select: { Key: true } } } },
  },
};

/**
 * Fetches multiple orders from database with specified ID and optional filters.
 * @param {IUseSchemas["id"]} id - The ID of the business for filtering records.
 * @param {IUseSchemas["getCheckout"] | undefined } query - The optional query filters.
 * @return - The filtered records from 'order' collection, ordered by 'createdAt' in 'desc' order.
 */
export const getOrderWithFilterById = (
  id: IUseSchemas["id"],
  query?: IUseSchemas["getCheckout"],
): Promise<IOrderWithFilter[]> =>
  prisma.order.findMany({
    where: {
      businessId: id,
      status: query?.status,
      OR: [
        {
          contact: {
            nome: {
              contains: query?.search,
              mode: "insensitive",
            },
          },
        },
        {
          id: query?.search,
        },
      ],
    },
    ...OrderWithFilterQuery,
    orderBy: { createdAt: "desc" },
  });

export type IOrderWithFilter = Prisma.OrderGetPayload<
  typeof OrderWithFilterQuery
>;

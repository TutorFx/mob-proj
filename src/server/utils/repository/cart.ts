import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const CartItemsQuery = {
  include: {
    images: {
      select: {
        Key: true,
      },
      take: 1,
    },
  },
};

export type ICartItemResponse = Prisma.ProductGetPayload<typeof CartItemsQuery>;

export type ICartItem = {
  totalprice: number;
  quantity: number;
};

export type ICartItems = {
  items: ICartItem[];
  info: {
    pricesum: number;
    quantitysum: number;
  };
};

export type ICart = { [key: string]: Array<IUseSchemas["cartItem"]> };

/**
 * Fetches cart items by product array.
 * @param businessSlug - UUID of the business
 * @param cartList - List of cart items
 * @returns {Promise<ICartItems>} The list of cart items or an error if the ID is invalid.
 * @throws {Error} When a cart item id does not exist in the products.
 */
export const getCartItemsByProductArray = async (
  businessSlug: IUseSchemas["uuid"],
  cartList: IUseSchemas["cartList"],
): Promise<ICartItems> => {
  const ids = cartList.map((item) => item.id);
  const products = (
    await prisma.product.findMany({
      where: {
        Business: {
          slug: businessSlug,
        },
        id: {
          in: ids,
        },
      },
      ...CartItemsQuery,
    })
  ).map((item) => {
    const cartitem = cartList.find((record) => record.id == item.id);
    if (!cartitem) throw new Error("ID Inválido");
    const totalprice = cartitem.quantity * item.price;
    return {
      ...item,
      ...cartitem,
      totalprice,
    };
  }) as ICartItem[];

  const pricesum = products.reduce<number>((accumulator, item) => {
    return accumulator + item.totalprice;
  }, 0);
  const quantitysum = products.reduce<number>((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);
  return { items: products, info: { pricesum, quantitysum } };
};

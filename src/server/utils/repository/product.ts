import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export const decodeProduct = (s: string) => decodeURI(decodeURIComponent(s));
const prisma = new PrismaClient();

const ProductWithImagePayload = {
  select: {
    id: true,
    name: true,
    description: true,
    price: true,
    images: {
      select: {
        id: true,
        Key: true,
      },
    },
  },
};

export type IProductWithImage = Prisma.ProductGetPayload<
  typeof ProductWithImagePayload
>;

/**
 * Async function to get a product with its image from the database
 * using its product name and business slug.
 *
 * @async
 * @param {Object} params - The parameters for the product to get.
 * @param {string} params.product - The name of the product to get.
 * @param {string} params.slug - The slug of the business owning the product.
 *
 * @returns {Promise<IProductWithImage|null>} A Promise that resolves to the product with its image if it exists, or null otherwise.
 */
export const getProductWithImage = async ({
  product,
  slug,
}: IUseSchemas["requirePublicProduct"]): Promise<IProductWithImage | null> => {
  return await prisma.product.findFirst({
    ...ProductWithImagePayload,
    where: {
      name: product,
      Business: {
        slug,
      },
    },
  });
};

const BusinessPayload = {
  select: {
    Products: {
      ...ProductWithImagePayload,
    },
  },
};

export type IProductsWithImage = Prisma.BusinessGetPayload<
  typeof BusinessPayload
>;

/**
 * Function to get products with images from the database based on business slug
 *
 * @param {Object} params - Contains slug of the business
 * @param {string} params.slug - Slug of the business
 *
 * @returns {Promise<IProductsWithImage|null>} - Promise resolves with an object containing product details, including images, ordered by updated at field in descending order; Null if no product found.
 */
export const getProductsWithImage = async ({
  slug,
}: IUseSchemas["requirePublicStore"]): Promise<IProductsWithImage | null> => {
  return await prisma.business.findUnique({
    where: {
      slug,
    },
    select: {
      Products: {
        ...ProductWithImagePayload,
        orderBy: { updatedAt: "desc" },
      },
    },
  });
};

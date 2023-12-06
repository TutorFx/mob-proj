import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const BusinessWithImageQuery = {
  include: {
    Image: {
      select: {
        Key: true,
      },
    },
    Owner: {
      select: {
        nome: true,
        email: true,
      },
    },
  },
};

export type IBusinessWithImage = Prisma.BusinessGetPayload<
  typeof BusinessWithImageQuery
>;

/**
 * Fetches businesses with their respective images from the database
 *
 * @return {Promise<IBusinessWithImage[]>} A promise that resolves to an array of businesses with images
 */
export const getBusinessWithImage = async (): Promise<IBusinessWithImage[]> => {
  const prisma = new PrismaClient();
  return await prisma.business.findMany(BusinessWithImageQuery);
};

/**
 * Toggles the ban status of a business.
 *
 * @param {string} id - The ID of the business.
 * @param {boolean} bool - The new ban status.
 * @return {Prisma.Prisma__BusinessClient<Prisma.Business>} The updated business.
 */
export const ToggleBan = (id: string, bool: boolean) => {
  const prisma = new PrismaClient();
  return prisma.business.update({
    where: {
      id,
    },
    data: {
      banned: bool,
    },
  });
};

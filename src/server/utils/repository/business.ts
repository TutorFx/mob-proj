import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type IBusiness = Prisma.BusinessGetPayload<true>;

/**
 * Returns a business by its slug
 * @param {Object} slug - The slug of the business.
 * @returns {Promise<IBusiness | null>} - A Promise that resolves to an IBusiness object or null.
 */
export const getBusinessBySlug = async ({
  slug,
}: IUseSchemas["requirePublicStore"]): Promise<IBusiness | null> => {
  return prisma.business.findUnique({
    where: {
      slug,
    },
  });
};

/**
 * Returns a business by its id
 * @param {number} id - The id of the business.
 * @returns {Promise<IBusiness | null>} - A Promise that resolves to an IBusiness object or null.
 */
export const getBusinessById = async (
  id: IUseSchemas["id"],
): Promise<IBusiness | null> =>
  prisma.business.findUnique({
    where: {
      id,
    },
  });

/**
 * Returns a businesses by owner id
 * @param {number} OwnerId - The id of the owner.
 * @returns {Promise<IBusiness[]>} - A Promise that resolves to an array of IBusiness objects.
 */
export const getBusinessByOwnerId = async (
  OwnerId: IUseSchemas["id"],
): Promise<IBusiness[]> => {
  return prisma.business.findMany({
    where: {
      OwnerId,
    },
  });
};

const BusinessWithOwnerPayload = {
  include: { Owner: true },
};

export type IBusinessOwner = Prisma.BusinessGetPayload<
  typeof BusinessWithOwnerPayload
>;

/**
 * Returns a business owner by business id
 * @param {number} BusinessId - The id of the business.
 * @returns {Promise<IBusinessOwner | null>} - A Promise that resolves to an IBusinessOwner object or null.
 */
export const getBusinessOwnerById = async (
  BusinessId: IUseSchemas["id"],
): Promise<IBusinessOwner | null> => {
  return prisma.business.findUnique({
    where: {
      id: BusinessId,
    },
    ...BusinessWithOwnerPayload,
  });
};

const BusinessProfileQuery = {
  include: {
    Image: true,
    Address: true,
  },
};

export type IBusinessProfile = Prisma.BusinessGetPayload<
  typeof BusinessProfileQuery
>;

/**
 * Returns a business profile by its id
 * @param {number} id - The id of the business.
 * @returns {Promise<IBusinessProfile | null>} - A Promise that resolves to an IBusinessProfile object or null including Image and Address.
 */
export const getBusinessProfileById = async (
  id: IUseSchemas["id"],
): Promise<IBusinessProfile | null> => {
  return await prisma.business.findUnique({
    where: {
      id,
    },
    ...BusinessProfileQuery,
  });
};

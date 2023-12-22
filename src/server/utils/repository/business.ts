import type { Prisma, Theme } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PublicBusinessWithImagePayload = {
  include: { Image: true },
};

const BusinessWithImagesPayload = {
  include: { Image: { select: { Key: true } } },
};

export type IBusiness = Prisma.BusinessGetPayload<
  typeof BusinessWithImagesPayload
>;

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
    ...BusinessWithImagesPayload,
  });
};

export type IPublicBusinessWithImage = Prisma.BusinessGetPayload<
  typeof PublicBusinessWithImagePayload
>;

/**
 * Returns a public business with its associated image by its slug
 * @param {Object} slug - The slug of the business.
 * @returns {Promise<IPublicBusinessWithImage | null>} - A Promise that resolves to an IPublicBusinessWithImage object or null.
 */
export const getPublicBusinessWithImageBySlug = async ({
  slug,
}: IUseSchemas["requirePublicStore"]): Promise<IPublicBusinessWithImage | null> =>
  prisma.business.findUnique({
    where: {
      slug,
    },
    ...PublicBusinessWithImagePayload,
  });

/**
 * Returns a public business with its associated image by its id
 * @param {number} id - The id of the business.
 * @returns {Promise<IPublicBusinessWithImage | null>} - A Promise that resolves to an IPublicBusinessWithImage object or null.
 */
export const getPublicBusinessWithImageById = async (
  id: IUseSchemas["id"],
): Promise<IPublicBusinessWithImage | null> =>
  prisma.business.findUnique({
    where: {
      id,
    },
    ...PublicBusinessWithImagePayload,
  });

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
    ...BusinessWithImagesPayload,
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
    ...BusinessWithImagesPayload,
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

/**
 * Sets the business theme
 * @param {number} id - The id of the business.
 * @param {Object} theme - The theme of the business.
 * @returns {Promise} - A Promise that resolves to the updated business.
 */
export const setBusinessTheme = async (id: IUseSchemas["id"], theme: Theme) => {
  return await prisma.business.update({
    where: {
      id,
    },
    data: {
      theme,
    },
  });
};

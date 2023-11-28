import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const BusinessWithImageQuery = {
  include: {
    Image: {
      select: {
        Key: true
      }
    },
    Owner: {
      select: {
        nome: true,
        email: true
      }
    }
  }
}

export type IBusinessWithImage = Prisma.BusinessGetPayload<
  typeof BusinessWithImageQuery
>;

export const BusinessWithImage = async (): Promise<IBusinessWithImage[]> => {
  const prisma = new PrismaClient()
  return await prisma.business.findMany(BusinessWithImageQuery)
}

export const ToggleBan = (id: string, bool: boolean) => {
  const prisma = new PrismaClient()
  return prisma.business.update({
    where: {
      id
    },
    data: {
      banned: bool
    }
  })
}

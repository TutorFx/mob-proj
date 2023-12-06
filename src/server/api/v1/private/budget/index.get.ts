import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const session = await getPrivateSession(event);
  try {
    const budget = await prisma.transaction.groupBy({
      by: ["businessId"],
      _sum: {
        amount: true,
      },
      where: {
        userId: session.id,
      },
    });

    const businesses = await prisma.business.findMany({
      where: {
        Transaction: {
          some: {
            userId: session.id,
          },
        },
      },
      select: {
        name: true,
        id: true,
        slug: true,
      },
    });

    const response = {
      wallets: businesses.map((business) => ({
        ...business,
        ...budget?.find((f) => f.businessId === business.id)?._sum,
      })),
      total: 0,
    };
    response.total = response.wallets?.reduce(
      (partialSum, a) => partialSum + (a.amount || 0),
      0,
    );

    return response;
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: "Businesses not found",
      }),
    );
  }
});

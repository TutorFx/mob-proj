import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const mapped = (
      await prisma.business.findMany({
        select: {
          slug: true,
          updatedAt: true,
          Products: {
            select: {
              name: true,
              updatedAt: true,
            },
          },
        },
      })
    ).map((business) => [
      {
        _path: `/${business.slug}`,
        modifiedAt: business.updatedAt,
      },
      ...business.Products.map((product) => ({
        _path: `/${business.slug}/${product.name}`,
        modifiedAt: product.updatedAt,
      })),
    ]);
    const mergedArray = mapped.reduce((accumulator, currentArray) => {
      return accumulator.concat(currentArray);
    }, []);
    return mergedArray;
  } catch (error) {
    console.log(error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return sendError(
        event,
        createError({
          statusCode: 204,
          statusMessage: "Nao pode fazer entrada",
        }),
      );
    }

    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "bugou",
      }),
    );
  }
});

import { Prisma } from "@prisma/client";

export default defineEventHandler(async (event) => {
  try {
    const { requirePublicStore } = useSchemas;
    const context = event.context.params;

    requirePublicStore.parse(context);

    const { slug } = context as IUseSchemas["requirePublicStore"];

    return getPublicProductsBySlug({ slug });
  } catch (error) {
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

    console.log(error);
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "bugou",
      }),
    );
  }
});

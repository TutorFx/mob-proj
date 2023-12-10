import { Prisma } from "@prisma/client";

export default defineEventHandler(async (event) => {
  try {
    const { requirePublicStore, cartList } = useSchemas;
    const context = event.context.params;

    const { slug } = context as IUseSchemas["requirePublicStore"];
    const body = await readBody<IUseSchemas["cartList"]>(event);

    requirePublicStore.parse(context);
    cartList.parse(body);

    return getCartItemsByProductArray(slug, body);
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
  }
});

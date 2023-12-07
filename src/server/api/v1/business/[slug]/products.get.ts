import { Prisma } from "@prisma/client";
import sanitizeHtml from "sanitize-html";
import { IUseSchemas, useSchemas } from "~/composables/useSchemas";

export default defineEventHandler(async (event) => {
  try {
    const { requirePublicStore } = useSchemas;
    const context = event.context.params;

    requirePublicStore.parse(context);

    const { slug } = context as IUseSchemas["requirePublicStore"];

    return (await getProductsWithImage({ slug }))?.Products.map((e) => ({
      ...e,
      slug: encodeURIComponent(e.name),
      description: sanitizeHtml(e.description).replace(/<[^>]+>/g, ""),
    }));
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

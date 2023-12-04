import { Prisma } from "@prisma/client";
import { IUseSchemas, useSchemas } from "~/composables/useSchemas";

export default defineEventHandler(async (event) => {
  try {
    const { requirePublicStore } = useSchemas;
    const context = event.context.params;

    requirePublicStore.parse(context);

    const { slug } = context as IUseSchemas["requirePublicStore"];

    return await getBusinessBySlug({ slug });
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

    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "bugou",
      }),
    );
  }
});

import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import sanitizeHtml from "sanitize-html";

export default defineEventHandler(async (event) => {
  try {
    const { requirePublicProduct } = useSchemas;
    const params = event.context.params;

    requirePublicProduct.parse(params);

    const { slug, product } = params as IUseSchemas["requirePublicProduct"];

    const response = await getProductWithImage({
      product: decodeProduct(product),
      slug,
    });

    if (!response) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: "Produto nao encontrado",
        }),
      );
    }

    return {
      ...response,
      description: sanitizeHtml(response.description),
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `${fromZodError(error)}`,
        }),
      );
    }
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

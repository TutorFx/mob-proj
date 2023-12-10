import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
export default defineEventHandler(async (event) => {
  try {
    const { validateBusiness } = useSchemas;

    const context = event.context.params as IUseSchemas["validateBusiness"];
    validateBusiness.parse(context);

    const { slug, id } = context;

    return await getProductWithImage({ product: id, slug });
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

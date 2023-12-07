import { sendError } from "h3";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { getOrderByID } from "~repository/order";

// TODO: Validate if the product is from this business

export default defineEventHandler(async (event) => {
  try {
    const params = event.context.params;
    return await getOrderByID(params);
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `${fromZodError(error)}`,
        }),
      );
    }
  }
});

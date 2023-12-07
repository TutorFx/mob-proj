import type { z } from "zod";
import { IUseSchemas, useSchemas } from "@/composables/useSchemas";

export default defineEventHandler(async (event) => {
  const { uuid } = useSchemas;
  const { id } = event.context.params as { id: IUseSchemas["uuid"] };
  type IGetCheckout = z.infer<typeof useSchemas.getCheckout>;
  const query = getQuery<IGetCheckout>(event);
  try {
    useSchemas.getCheckout.parse(query);
    uuid.parse(id);
    const orders = await getOrderWithFilterById(id, query);

    return orders;
  } catch (error) {
    console.log(error);
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: "Businesses not found",
      }),
    );
  }
});

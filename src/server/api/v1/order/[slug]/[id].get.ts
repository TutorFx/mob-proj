import { PrismaClient } from "@prisma/client";
import { sendError } from "h3";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// TODO: Validate if the product is from this business

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  if (!event.context.params || !("slug" in event.context.params))
    // Handle the error case when params does not exist or when it does not have a slug property
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Slug inválido",
      }),
    );

  if (!event.context.params || !("id" in event.context.params))
    // Handle the error case when params does not exist or when it does not have a ID property
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "ID inválido",
      }),
    );

  const { slug } = event.context.params;

  const { id } = event.context.params;

  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        contact: true,
        address: true,
        ProductOnOrder: {
          include: {
            product: {
              include: { images: { take: 1 } },
            },
          },
        },
        Business: { include: { Image: true } },
      },
    });

    if (order?.Business.slug !== slug) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "Pedido inválido",
        }),
      );
    }

    return order;
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

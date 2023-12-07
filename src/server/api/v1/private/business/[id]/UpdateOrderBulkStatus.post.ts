import { OrderStatus, PrismaClient } from "@prisma/client";
import { sendError } from "h3";
import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";
import { useSchemas } from "@/composables/useSchemas";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const id = event.context.params?.id as string;
  const { uuid } = useSchemas;
  const { idlist, status } = (await readBody(event)) as {
    idlist: string[];
    status: OrderStatus;
  };
  const user = await getPrivateSession(event);

  if (!id) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "id inválido",
      }),
    );
  }

  try {
    z.array(uuid).parse(idlist);
    z.nativeEnum(OrderStatus).parse(status);

    if (!OrderStatus[status]) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "id inválido",
        }),
      );
    }

    await prisma.order.updateMany({
      where: {
        Business: { OwnerId: user.id, id },
        id: { in: idlist },
      },
      data: {
        status,
      },
    });

    return { message: "Success" };
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

import { Prisma, PrismaClient } from "@prisma/client";
import type { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { deleteFromS3 } from "@/server/utils";

const prisma = new PrismaClient();
const { uuid } = useSchemas;
type IUuid = z.infer<typeof uuid>;

export default defineEventHandler(async (event) => {
  const session = await getPrivateSession(event);
  const id = event.context.params?.id as IUuid;

  try {
    uuid.parse(id);
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
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Unknown error",
      }),
    );
  }
  if (session?.user?.email == null || session?.id == null) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Invalid User",
      }),
    );
  }
  try {
    const image = await prisma.image.findUnique({
      where: {
        id,
      },
      select: {
        Product: {
          select: {
            Business: true,
          },
        },
        Business: true,
        Key: true,
      },
    });

    console.log(image);

    if (!image?.Product?.Business && !image?.Business) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: "Business not found",
        }),
      );
    }

    // Usuário autenticado tem permissão?
    if (
      image?.Product?.Business.OwnerId !== session.id &&
      image?.Business?.OwnerId !== session.id
    ) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `User with ID ${
            session.user.email
          } is not the owner of business ${
            image?.Product?.Business.name ?? image?.Business?.name
          }`,
        }),
      );
    }

    await deleteFromS3(image.Key);

    await prisma.image.delete({
      where: {
        id,
      },
    });

    return { message: "Success!" };
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

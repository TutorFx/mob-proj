import { Prisma, PrismaClient } from "@prisma/client";
import type { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

const prisma = new PrismaClient();
const { uuid } = useSchemas;
type IUuid = z.infer<typeof uuid>;

export default defineEventHandler(async (event) => {
  try {
    const session = await getPrivateSession(event);
    const id = event.context.params?.id as IUuid;
    const body = await readBody(event);
    const { businessId } = body;

    uuid.parse(id);
    uuid.parse(businessId);

    const productBusiness = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        Business: {
          select: {
            OwnerId: true,
            name: true,
          },
        },
        images: true,
        businessId: true,
      },
    });

    if (!productBusiness?.Business) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `Business with ID ${businessId} not found`,
        }),
      );
    }

    // Usuário autenticado tem permissão?
    if (productBusiness?.Business.OwnerId !== session.id) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `User with ID ${session.user.email} is not the owner of business ${productBusiness.Business.name}`,
        }),
      );
    }

    productBusiness.images.forEach(async (image) => {
      await deleteFromS3(image.Key);
    });

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return { status: "Sucess" };
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
          statusMessage: "Não pode deletar",
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

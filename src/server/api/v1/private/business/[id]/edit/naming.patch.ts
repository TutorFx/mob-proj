import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { useSchemas } from "~/composables/useSchemas";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id as string;
  const { uuid, createBusinessSchema } = useSchemas;
  const body = await readBody(event);
  const session = await event.context.session;

  try {
    uuid.parse(id);
    uuid.parse(session.id);
    createBusinessSchema.parse(body);

    const business = await getBusinessById(id);
    if (!business) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `Business with ID ${id} not found`,
        }),
      );
    }
    // Usuário autenticado tem permissão?
    if (business.OwnerId !== session.id) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `User with ID ${session.user.email} is not the owner of business ${business.name}`,
        }),
      );
    }

    await prisma.business.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        description: body.description,
        slug: body.slug,
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
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: "Businesses not found",
      }),
    );
  }
});

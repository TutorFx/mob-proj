import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { useSchemas } from "~/composables/useSchemas";
import type { TAddress } from "~/types/addr";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const { uuid, address } = useSchemas;
  const body = await readBody<TAddress>(event);
  const session = await event.context.session;

  try {
    uuid.parse(id);
    uuid.parse(session.id);
    address.parse(body);

    const { cep, estado, cidade, endereco, bairro, numero, complemento } = body;

    const business = await prisma.business.findUnique({
      where: {
        id,
      },
    });

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

    await prisma.address.upsert({
      where: {
        businessId: id,
      },
      update: {
        cep,
        estado,
        cidade,
        endereco,
        bairro,
        numero,
        complemento,
      },
      create: {
        cep,
        estado,
        cidade,
        endereco,
        bairro,
        numero,
        complemento,
        businessId: id,
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

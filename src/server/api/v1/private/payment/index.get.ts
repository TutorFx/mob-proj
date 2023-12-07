import { PrismaClient } from "@prisma/client";
import type { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { useSchemas } from "~/composables/useSchemas";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    "Cache-Control": "s-maxage=30, max-age=30, stale-while-revalidate=30",
  });
  const { getBusinessPaymentSchema } = useSchemas;
  type GetTransactionRequest = z.infer<typeof getBusinessPaymentSchema>;
  try {
    const query: GetTransactionRequest = getQuery<GetTransactionRequest>(event);
    getBusinessPaymentSchema.parse(query);

    const user = await event.context.user();

    const business = await prisma.business.findUnique({
      where: { id: query.businessId },
      select: {
        Owner: true,
        OwnerId: true,
        name: true,
      },
    });

    if (!business) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `Business with ID ${query.businessId} not found`,
        }),
      );
    }

    // Usuário autenticado tem permissão?
    if (business.OwnerId !== user.id) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `User with ID ${user.email} is not the owner of business ${business.name}`,
        }),
      );
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        businessId: query.businessId,
      },
      select: {
        amount: true,
        id: true,
        business: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            email: true,
          },
        },
        origin: {
          select: {
            email: true,
          },
        },
      },
    });

    return transactions;
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
    console.log(error);
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: "Payment not found",
      }),
    );
  }
});

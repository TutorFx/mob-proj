import { PrismaClient } from '@prisma/client';
import { ZodError, z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { useSchemas } from '~/composables/useSchemas';
import { useRules } from '~/composables/useRules';

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { getBusinessPaymentSchema } = useSchemas;
  type GetTransactionRequest = z.infer<typeof getBusinessPaymentSchema>;

  try {
    //@ts-ignore
    const query: GetTransactionRequest = getQuery(event);
    getBusinessPaymentSchema.parse(query)

    const user = await event.context.user();

    const business = await prisma.business.findUnique({
      where: { id: query.businessId },
      select: { 
        Owner: true, 
        OwnerId: true, 
        name: true 
      },
    })

    if (!business) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `Business with ID ${query.businessId} not found`
        })
      )
    }

    // Usuário autenticado tem permissão?
    if (business.OwnerId !== user.id) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `User with ID ${user.email} is not the owner of business ${business.name}`
        })
      )
    }

    const transactions = await prisma.transaction.findMany({
      where: { 
        businessId: query.businessId
      },
      select: {
        amount: true,
        id: true,
        business: {
          select: {
            name: true,
          }
        },
        user: {
          select : {
            email: true,
          }
        }
      }
    })

    return transactions

  } catch (error) {
    if (error instanceof ZodError)
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `${fromZodError(error)}`,
        })
      );
    console.log(error)
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Payment not found'
      })
    );
  }
})
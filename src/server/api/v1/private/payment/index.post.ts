import { getServerSession } from '#auth'
import { Prisma, PrismaClient, User } from '@prisma/client';
import { ZodError, z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { useSchemas } from "~/composables/useSchemas"
const prisma = new PrismaClient()
const { createMoneyDepositSchema } = useSchemas;
type TransactionRequest = z.infer<typeof createMoneyDepositSchema>;

export default defineEventHandler(async (event) => {
  const body: TransactionRequest = await readBody(event);
  const session = await getServerSession(event)
  try {
    createMoneyDepositSchema.parse(body)
  } catch (error) {
    if (error instanceof ZodError)
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `${fromZodError(error)}`,
        })
      );
    return 'Unknown Error'
  }
  if (session?.user?.email == null) return sendError(
    event,
    createError({
      statusCode: 500,
      statusMessage: 'Bad news, server error'
    })
  );
  try {
    // @ts-expect-error
    const { businessId, userMail, amount } = body;

    const user : User = await event.context.user();

    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: { Owner: true },
    })

    if (!business) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `Business with ID ${businessId} not found`
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

    const target = await prisma.user.findUnique({
      where: {
        email: userMail
      },
    });

    if(!target){
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `User with Email ${userMail} was not found. Please try again with a registered user.`
        })
      )
    }

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        businessId,
        userId: target.id,
        originId: user.id,
      },
    })

    return transaction;

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
      // The .code property can be accessed in a type-safe manner
      return sendError(
        event,
        createError({
          statusCode: 204,
          statusMessage: 'Nao pode fazer entrada'
        })
      );


    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'bugou'
      })
    );
  }
})
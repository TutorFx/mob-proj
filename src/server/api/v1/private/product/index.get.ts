import { Prisma, PrismaClient } from '@prisma/client';
import type { z } from 'zod';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import sanitizeHtml from 'sanitize-html';
import { useSchemas } from '~/composables/useSchemas';

const prisma = new PrismaClient()
const { getProductSchema } = useSchemas;
type IProductSchema = z.infer<typeof getProductSchema>;

export default defineEventHandler(async (event) => {
  const session = await event.context.session;
  const query = getQuery(event) as IProductSchema
  try {
    getProductSchema.parse(query)
  } catch (error) {
    if (error instanceof ZodError)
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `${fromZodError(error)}`,
        })
      );
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'Unknown error'
      })
    );
  }
  if (session?.user?.email == null || session?.id == null) return sendError(
    event,
    createError({
      statusCode: 500,
      statusMessage: 'Invalid User'
    })
  );
  try {
    const { businessId } = query;

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
    if (business.OwnerId !== session.id) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: `User with ID ${session.user.email} is not the owner of business ${business.name}`
        })
      )
    }

    const product = await prisma.product.findMany({
      where: {
        businessId,
      },
      include: {
        images: true
      },
      orderBy: { updatedAt: 'desc' }
    })

    return product?.map((e) => ({
      ...e,
      slug: encodeURIComponent(e.name),
      description: sanitizeHtml(e.description).replace(/<[^>]+>/g, '')
    }));

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
      return sendError(
        event,
        createError({
          statusCode: 204,
          statusMessage: 'Nao pode fazer entrada'
        })
      );

    console.log(error)
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'bugou'
      })
    );
  }
})
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { ZodError, z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export default defineEventHandler(async (event) => {
  try {
    // @ts-ignore
    const { slug, id } = event.context.params;
    const idSchema = z.string().min(1)
    const slugSchema = z.string().min(1)
    type IName = z.infer<typeof idSchema>;
    type ISlug = z.infer<typeof slugSchema>;
    idSchema.parse(id)
    slugSchema.parse(slug)

    return await prisma.product.findFirst({
      where: {
        id,
        Business: {
          slug
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: {
          select: {
            id: true,
            Key: true
          }
        }
      },
    })

  } catch (error) {
    if (error instanceof ZodError)
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `${fromZodError(error)}`,
        })
      );
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
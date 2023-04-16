import { PrismaClient, Prisma } from '@prisma/client';
import { sendError } from "h3";
import { z, ZodError } from 'zod';
import { useSchemas } from "~/composables/useSchemas"
import { fromZodError } from 'zod-validation-error';
const { registerSchema } = useSchemas;


export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  const body = await readBody(event)
  try {
    registerSchema.parse(body)
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
  try {
    await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      }
    })
    return { message: 'Created' }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2002') {
        return sendError(
          event,
          createError({
            statusCode: 204,
            statusMessage: 'A new user cannot be created with this email'
          })
        );
      }
    } else {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: 'Unknown error'
        })
      )
    }
  }
})
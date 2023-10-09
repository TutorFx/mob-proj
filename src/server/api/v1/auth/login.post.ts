import { generateToken } from "../../../utils/token";
import bcrypt from "bcryptjs";
import { PrismaClient, Prisma } from "@prisma/client";
import { useSchemas } from "~/composables/useSchemas";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { Authentication } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: username }, { cpf: username }],
      },
    });

    if (!user)
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "User not found",
        })
      );

    if (!(await bcrypt.compare(password, user.password))) {
      console.error(
        "Warning: Malicious login attempt registered, bad credentials provided"
      );
      return sendError(
        event,
        createError({
          statusCode: 403,
          statusMessage: "Not Authenticated",
        })
      );
    }

    const auth = new Authentication(user);
    auth.createCookie(event);
    return { status: 200, message: "Authenticated" };
  } catch (error) {
    if (error instanceof ZodError)
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: `${fromZodError(error)}`,
        })
      );
  }
});

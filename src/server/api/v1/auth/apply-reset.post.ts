import bcrypt from "bcryptjs";
import { PrismaClient, TokenStatus } from "@prisma/client";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { Authentication } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ password: string; token: string }>(event);
  const { password, token } = body;
  try {
    const prisma = new PrismaClient();

    const resetToken = await prisma.resetToken.update({
      where: {
        id: token,
      },
      select: {
        User: { select: { id: true } },
      },
      data: {
        status: TokenStatus.USED,
      },
    });

    if (!resetToken) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "Invalid Token",
        }),
      );
    }

    const user = await prisma.user.update({
      where: {
        id: resetToken.User.id,
      },
      data: {
        password: bcrypt.hashSync(password, 10),
      },
    });
    const auth = new Authentication(user);
    auth.createCookie(event);
    return { status: 200, message: "Authenticated" };
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
  }
});

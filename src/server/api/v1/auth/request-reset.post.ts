import { generateToken } from "../../../utils/token";
import bcrypt from "bcryptjs";
import { PrismaClient, Prisma } from "@prisma/client";
import { useSchemas } from "~/composables/useSchemas";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { Authentication } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { credential } = body;
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: credential }, { cpf: credential }],
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

    const token = await prisma.resetToken.create({
      data: {
        userId: user.id,
      },
    });

    const service = new MailServices.Default({
      to: 'gabrielserejo11@gmail.com',
      from: "noreply@nuxa.io",
      subject: "Recuperação de senha",
      template: templates.recovery,
      context: {
        token: token.id,
      },
    });

    service.sendMail();

    return { status: 200, message: "Redefine token sent" };

    /*     const auth = new Authentication(user);
    auth.createCookie(event);
    return { status: 200, message: "Authenticated" }; */
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

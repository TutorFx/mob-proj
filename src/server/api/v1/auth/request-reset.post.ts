import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

const { public: global } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { credentials } = body;
  try {
    const prisma = new PrismaClient();
    const cpf = removeMask(credentials);
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: credentials }, { cpf }],
      },
    });

    if (!user) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: "User not found",
        }),
      );
    }

    const token = await prisma.resetToken.create({
      data: {
        userId: user.id,
      },
    });

    const service = new MailServices.Recovery({
      to: user.email,
      from: "no-reply@nuxa.io",
      subject: "Recuperação de senha",
      template: templates.recovery,
      context: {
        token: `${global.URL}recovery/${token.id}`,
      },
    });

    await service.sendMail();

    return { status: 200, message: "Redefine token sent" };
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
    throw error;
  }
});

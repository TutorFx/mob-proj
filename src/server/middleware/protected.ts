import type { H3Event } from "h3";
import type { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "@/server/utils/auth";
const apiPath = "/api/v1";
const prisma = new PrismaClient();

export default defineEventHandler((event) => {
  const { url } = event.node.req;
  const session = getServerSession(event);

  const notAuth = (event: H3Event) =>
    sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: `Not authenticated`,
      })
    );

  if (!url) return;

  if (!url.startsWith(`${apiPath}/private`)) return;

  if (!session) return notAuth(event);

  const email = session?.user?.email;

  if (!email) return;
  event.context.session = session;
  event.context.user = async (): Promise<User | null> =>
    await prisma.user.findUnique({
      where: {
        email,
      },
    });

  if (!url.startsWith(`${apiPath}/private/admin`)) return;

  if (session.user.role !== "ADMIN")
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: `Not authenticated`,
      })
    );
});

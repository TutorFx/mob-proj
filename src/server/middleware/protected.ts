const api_path = '/api/v1'
import { getServerSession } from '#auth';
import type { H3Event } from 'h3';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export default defineEventHandler( async (event) => {
  const { url, method } = event.node.req;
  const session = await getServerSession(event);

  const notAuth = (event: H3Event) => sendError(
    event,
    createError({
      statusCode: 401,
      statusMessage: `Not authenticated`,
    })
  );

  if(!url) return;
  
  if (!url.startsWith(`${api_path}/private`)) return;

  if (!session) return notAuth(event);

  const email = session?.user?.email;
  
  if ( !email ) return;

  event.context.user = await prisma.user.findFirst({
    where: {
      email
    },
  });
  
})
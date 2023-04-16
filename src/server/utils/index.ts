import { getServerSession } from '#auth';
import type { H3Event } from 'h3';

export const middleware = async (event: H3Event, callback: Function) => {
  const session = await getServerSession(event);
  if (!session) sendError(
    event,
    createError({
      statusCode: 401,
      statusMessage: 'Not authenticated.',
      message: 'You need to login first.'
    })
  );
  callback();
}
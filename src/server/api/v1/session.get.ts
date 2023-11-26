import { VerifyAuthentication } from '@/server/utils/auth'
export default defineEventHandler((event) => {
  try {
    const auth = new VerifyAuthentication(event);
    return auth.getSession()
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Invalid Token - Not authorized'
      })
    )
  }
})
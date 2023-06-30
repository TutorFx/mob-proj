import { VerifyAuthentication } from '@/server/utils/auth'
export default defineEventHandler(async (event) => {
  try {
    const auth = new VerifyAuthentication(event);
    return auth.getSession()
  } catch (error) {
    return { status: 401, message:'Invalid Token - Not authorized' }
  }
})
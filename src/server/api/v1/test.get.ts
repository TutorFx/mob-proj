import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  return await getServerSession(event)
})
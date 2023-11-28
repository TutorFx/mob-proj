export default defineEventHandler(async (event) => {
  const body = await readBody<{ id: string, ban: boolean }>(event)
  return await ToggleBan(body.id, body.ban)
})

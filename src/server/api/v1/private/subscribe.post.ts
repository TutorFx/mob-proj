import { CreatePaymentAccount } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const account = new CreatePaymentAccount(event);
  account.init()
  console.log(account);
  const body = await readBody(event)
  const session = await event.context.session;
  return ":)"
  // const url = 'https://www.google.com'
  // await sendRedirect(event, url)
})
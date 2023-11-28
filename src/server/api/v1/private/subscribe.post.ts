import { CreatePaymentAccount } from '~/server/utils/auth'

export default defineEventHandler((event) => {
  const account = new CreatePaymentAccount(event)
  // account.init()
  console.log(account)

  return ':)'
  // const url = 'https://www.google.com'
  // await sendRedirect(event, url)
})

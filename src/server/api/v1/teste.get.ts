import { transport } from '@/server/utils/mailer'

export default defineEventHandler(async (event) => {
  try {
    const response = await transport.sendMail(
      {
        to: 'gabrielserejo11@gmail.com',
        from: "gabrielserejo11@gmail.com",
        subject: "Redefinição de senha",
        template: "auth/recovery",
        context: { token: 'teste' }
      });
    return response;
  } catch (error) {

  }
})
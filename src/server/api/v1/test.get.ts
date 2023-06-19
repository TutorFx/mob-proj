import twilio from 'twilio';
export default defineEventHandler(async (event) => {

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  return await client.messages
    .create({
      mediaUrl: ['https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'],
      from: 'whatsapp:+14067196590',
      to: 'whatsapp:+5562994063442'
    });

})
import { User } from '@prisma/client';
import { H3Event } from 'h3'
import { validateToken, generateToken } from './token';
import { useSchemas } from '@/composables/useSchemas'


export class Authentication {
  static token: string;
  static user: TokenData;
  constructor(user: User) {
    const data = {
      id: user.id,
      nome: user.nome,
      email: user.email
    } as validateToken;
    Authentication.user = data;
    Authentication.token = generateToken(data);
  }
  createCookie(event: H3Event) {
    setCookie(event, 'token', Authentication.token)
  }
}

export class VerifyAuthentication {
  static token: string;
  static user: User;
  constructor(event: H3Event) {
    const token = getCookie(event, 'token');
    if (!token) throw new Error('Invalid_Token', { cause: 'You got an invalid token' })
    const tokenResponse = validateToken(token);
    useSchemas.User.parse(tokenResponse);
    // @ts-expect-error
    VerifyAuthentication.user = tokenResponse as validateToken;
    VerifyAuthentication.token = token
  }
  getUser() { return VerifyAuthentication.user };
  getToken() { return VerifyAuthentication.token };
  getSession() {
    const { id, email, nome } = VerifyAuthentication.user
    return {
      user: { email, nome },
      id
    } as Session
  }
}

export const getServerSession = (event: H3Event): Session | null => {
  try {
    const auth = new VerifyAuthentication(event);
    return auth.getSession()
  } catch (error) {
    return null;
  }
}
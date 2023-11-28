import type { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { H3Event } from "h3";
import Stripe from "stripe";
import { generateToken, validateToken } from "./token";
import { useSchemas } from "@/composables/useSchemas";
import type { IValidateToken, Session, TokenData } from "~/types";
const config = useRuntimeConfig();
const stripe = new Stripe(config.stripeSecretKey, { apiVersion: "2022-11-15" });

const prisma = new PrismaClient();

export class Authentication {
  static token: string;
  static user: TokenData;
  constructor(user: User) {
    const data = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      plan: user.plan,
      role: user.role,
      isCostumer: Boolean(user.stripe_costumer_id),
    };
    Authentication.user = data;
    Authentication.token = generateToken(data);
  }

  createCookie(event: H3Event) {
    setCookie(event, "token", Authentication.token);
  }
}

export class VerifyAuthentication {
  static token: string;
  static user: IValidateToken;
  constructor(event: H3Event) {
    const token = getCookie(event, "token");
    if (!token) {
      throw new Error("Invalid_Token", { cause: "You got an invalid token" });
    }
    const tokenResponse = validateToken(token);
    useSchemas.User.parse(tokenResponse);
    // @ts-expect-error because the type casting is necessary here
    VerifyAuthentication.user = tokenResponse as validateToken;
    VerifyAuthentication.token = token;
  }

  getUser() {
    return VerifyAuthentication.user;
  }
  getToken() {
    return VerifyAuthentication.token;
  }
  getSession() {
    const { id, email, nome, plan, role, isCostumer } =
      VerifyAuthentication.user;
    return {
      user: { email, nome, plan, role, isCostumer },
      id,
    } as Session;
  }
}

export const getServerSession = (event: H3Event): Session | null => {
  try {
    const auth = new VerifyAuthentication(event);
    return auth.getSession();
  } catch (error) {
    return null;
  }
};

export class CreatePaymentAccount extends VerifyAuthentication {
  // constructor(event: H3Event) {
  //   super(event);
  // }

  async init(priceId: string, callback: () => void) {
    const session = this.getSession();
    if (!session.user.isCostumer) {
      const user = await prisma.user.findUnique({
        where: {
          id: session.id,
        },
        select: {
          stripe_costumer_id: true,
        },
      });
      if (user?.stripe_costumer_id) {
        return;
      }
      try {
        await prisma.user.update({
          where: {
            id: session.id,
          },
          data: {
            stripe_costumer_id: session.id,
          },
        });
        const stripeSession = await stripe.checkout.sessions.create({
          mode: "subscription",
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
          // the actual Session ID is returned in the query parameter when your customer
          // is redirected to the success page.
          success_url: `${config.public.URL}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${config.public.URL}/cancel`,
          customer: session.id,
        });
        console.log(stripeSession);
        callback.bind(stripeSession)();
      } catch {
        console.log("Subscription FAILED");
      }
    }
    callback.bind(this)();
  }
}

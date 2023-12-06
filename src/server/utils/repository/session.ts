import { H3Event } from "h3";

export type Session = {
  user: {
    nome: string | null;
    email: string;
    plan: string;
    isCostumer: boolean;
    role: string;
  };
  id: string;
};

/**
 * This function gets the private session from the given H3Event.
 *
 * @param {H3Event} H3Event - The H3 event from which to get the private session.
 *
 * @returns {Promise<Session>} The private session.
 */
export const getPrivateSession = async (H3Event: H3Event): Promise<Session> => {
  return (await H3Event.context.session) as Session;
};

import { Session } from "~/types";
import { H3Event } from "h3";

export const getPrivateSession = async (H3Event: H3Event): Promise<Session> => {
  return (await H3Event.context.session) as Session;
};

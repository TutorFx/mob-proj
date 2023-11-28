import { OrderStatus } from "@prisma/client";

export default defineEventHandler(async () => {
  return OrderStatus;
});

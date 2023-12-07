import { Prisma } from "@prisma/client";

export type TOrder = Prisma.OrderGetPayload<{
  where: {
    businessId: id;
  };
  include: {
    contact: true;
    address: true;
    status: true;
    ProductOnOrder: {
      include: {
        product: {
          include: { images: { take: 1 } };
        };
      };
    };
    Business: { include: { Image: true } };
  };
}>;

export type TOrderProduct = Prisma.ProductOnOrderGetPayload<{
  include: {
    product: {
      include: { images: { take: 1 } };
    };
  };
}>;

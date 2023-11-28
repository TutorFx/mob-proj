import { Product, Image } from "@prisma/client";

const { cart, contact, address } = useSchemas;
export type ICart = z.infer<typeof cart>;
export type IContact = z.infer<typeof contact>;
export type IAddress = z.infer<typeof address>;
export type IItem = TItem &
  Product & { totalprice: number } & { images?: Image[] };
export type IProductCart = Array<IItem>;

import { Product, Image } from '@prisma/client';

const { cart } = useSchemas;
type ICart = z.infer<typeof cart>;
type IItem = TItem & Product & {totalprice: number} & {images?: Image[]}
type IProductCart = Array<IItem>
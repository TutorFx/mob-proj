import { Business, Image, Address } from '@prisma/client';
type 
export type IEditBusiness = Business & Object<'Image', Image> & Object<'Address', Address>
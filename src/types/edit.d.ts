import { Business, Image, Address } from "@prisma/client";
export type IEditBusiness = Business &
  Object<"Image", Image> &
  Object<"Address", Address>;

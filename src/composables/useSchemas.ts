import { OrderStatus } from "@prisma/client";
import { z } from "zod";
import { useRules } from "~/composables/useRules";

const slug = z.string().nonempty("Campo obrigatório");
const id = z.string().refine(useRules.uuid);
const productName = z.string().nonempty("Campo obrigatório");

export const useSchemas = {
  registerSchema: z.object({
    email: z.string().min(1).max(50),
    password: z.string(),
  }),
  loginSchema: z.object({
    username: z.string().min(1).max(50),
    password: z.string(),
  }),
  User: z.object({
    id,
    nome: z.string().nonempty("Campo obrigatório").nullable(),
    email: z.string().min(1).max(50),
    iat: z.number(),
    exp: z.number(),
  }),
  createMoneyDepositSchema: z.object({
    businessId: id,
    userMail: z.string().email().min(5),
    amount: z.number(),
  }),
  createBusinessSchema: z.object({
    name: productName,
    slug,
  }),
  businessContact: z.object({
    whatsapp: z
      .string({ invalid_type_error: "Campo obrigatório" })
      .nonempty("Campo obrigatório")
      .min(14, "Número de telefone inválido")
      .max(16, "Número de telefone inválido"),
    email: z
      .string({ invalid_type_error: "Campo obrigatório" })
      .nonempty("Campo obrigatório")
      .email("Email não é válido"),
  }),
  getBusinessPaymentSchema: z.object({
    businessId: id,
  }),
  createProductSchema: z.object({
    name: productName,
    description: z.string().nonempty("Campo obrigatório"),
    price: z.number().nonnegative("O número deve ser positivo"),
    businessId: id,
  }),
  editProductSchema: z.object({
    name: productName,
    description: z.string().nonempty("Campo obrigatório"),
    price: z.number().nonnegative("O número deve ser positivo"),
    businessId: id,
  }),
  getProductSchema: z.object({
    businessId: id,
    search: z.string().optional(),
    page: z.number().nonnegative().optional(),
  }),
  uuid: z.string().refine(useRules.uuid),
  cart: z.array(
    z.object({
      id,
      quantity: z.number().nonnegative(),
    }),
  ),
  contact: z.object({
    nome: z.string().nonempty("Campo obrigatório"),
    celular: z
      .string()
      .nonempty("Campo obrigatório")
      .min(14, "Número de telefone inválido")
      .max(16, "Número de telefone inválido"),
    whatsapp: z.boolean(),
  }),
  address: z.object({
    cep: z.string().nonempty("Campo obrigatório").min(9, "Cep inválido"),
    estado: z.number().min(1, "Campo obrigatório"),
    cidade: z.number().min(1, "Campo obrigatório"),
    endereco: z
      .string({ required_error: "Campo obrigatório" })
      .nonempty("Campo obrigatório"),
    bairro: z
      .string({ required_error: "Campo obrigatório" })
      .nonempty("Campo obrigatório"),
    numero: z.number().nullable(),
    complemento: z.string().nullable(),
  }),
  gptDescription: z.object({
    name: z.string().nonempty("Campo obrigatório"),
    price: z.number().nonnegative("O número deve ser positivo"),
    description: z.string().optional(),
  }),
  passwordReset: z
    .object({
      password: z.string().nonempty("Campo obrigatório"),
      passwordConfirmation: z.string().nonempty("Campo obrigatório"),
    })
    .superRefine(({ passwordConfirmation, password }, ctx) => {
      if (passwordConfirmation !== password) {
        ctx.addIssue({
          code: "custom",
          message: "As senhas não conferem",
        });
      }
    }),
  getCheckout: z.object({
    status: z.nativeEnum(OrderStatus).optional(),
    search: z.string().optional(),
  }),
  validateBusiness: z.object({
    id,
    slug,
  }),
  requirePublicProduct: z.object({
    product: productName,
    slug,
  }),
  requirePublicStore: z.object({
    slug,
  }),
  id,
};

export type IUseSchemas = {
  [K in keyof typeof useSchemas]: z.infer<(typeof useSchemas)[K]>;
};

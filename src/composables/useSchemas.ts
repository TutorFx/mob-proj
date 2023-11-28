import { OrderStatus } from '@prisma/client'
import { z } from 'zod'
import { useRules } from '~/composables/useRules'

export const useSchemas = {
  registerSchema: z.object({
    email: z.string().min(1).max(50),
    password: z.string()
  }),
  loginSchema: z.object({
    username: z.string().min(1).max(50),
    password: z.string()
  }),
  User: z.object({
    id: z.string().refine(useRules.uuid),
    nome: z.string().nonempty('Campo obrigatório').nullable(),
    email: z.string().min(1).max(50),
    iat: z.number(),
    exp: z.number()
  }),
  createMoneyDepositSchema: z.object({
    businessId: z.string().refine(useRules.uuid),
    userMail: z.string().email().min(5),
    amount: z.number()
  }),
  createBusinessSchema: z.object({
    name: z.string().nonempty('Campo obrigatório'),
    slug: z.string().nonempty('Campo obrigatório')
  }),
  businessContact: z.object({
    whatsapp: z.string({ invalid_type_error: 'Campo obrigatório' }).nonempty('Campo obrigatório').min(14, 'Número de telefone inválido').max(16, 'Número de telefone inválido'),
    email: z.string({ invalid_type_error: 'Campo obrigatório' }).nonempty('Campo obrigatório').email('Email não é válido')
  }),
  getBusinessPaymentSchema: z.object({
    businessId: z.string().refine(useRules.uuid)
  }),
  createProductSchema: z.object({
    name: z.string().nonempty('Campo obrigatório'),
    description: z.string().nonempty('Campo obrigatório'),
    price: z.number().nonnegative('O número deve ser positivo'),
    businessId: z.string().refine(useRules.uuid)
  }),
  editProductSchema: z.object({
    name: z.string().nonempty('Campo obrigatório'),
    description: z.string().nonempty('Campo obrigatório'),
    price: z.number().nonnegative('O número deve ser positivo'),
    businessId: z.string().refine(useRules.uuid)
  }),
  getProductSchema: z.object({
    businessId: z.string().refine(useRules.uuid),
    search: z.string().optional(),
    page: z.number().nonnegative().optional()
  }),
  uuid: z.string().refine(useRules.uuid),
  cart: z.array(z.object({
    id: z.string().refine(useRules.uuid),
    quantity: z.number().nonnegative()
  })),
  contact: z.object({
    nome: z.string().nonempty('Campo obrigatório'),
    celular: z.string().nonempty('Campo obrigatório').min(14, 'Número de telefone inválido').max(16, 'Número de telefone inválido'),
    whatsapp: z.boolean()
  }),
  address: z.object({
    cep: z.string().nonempty('Campo obrigatório').min(9, 'Cep inválido'),
    estado: z.number().min(1, 'Campo obrigatório'),
    cidade: z.number().min(1, 'Campo obrigatório'),
    endereco: z.string({ required_error: 'Campo obrigatório' }).nonempty('Campo obrigatório'),
    bairro: z.string({ required_error: 'Campo obrigatório' }).nonempty('Campo obrigatório'),
    numero: z.number().nullable(),
    complemento: z.string().nullable()
  }),
  gptDescription: z.object({
    name: z.string().nonempty('Campo obrigatório'),
    price: z.number().nonnegative('O número deve ser positivo'),
    description: z.string().optional()
  }),
  passwordReset: z.object({
    password: z.string().nonempty('Campo obrigatório'),
    passwordConfirmation: z.string().nonempty('Campo obrigatório')
  }).superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas não conferem'
      })
    }
  }),
  getCheckout: z.object({
    status: z.nativeEnum(OrderStatus).optional(),
    search: z.string().optional()
  })
}

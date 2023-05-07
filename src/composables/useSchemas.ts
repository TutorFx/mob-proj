import { z } from 'zod';
import { useRules } from '~/composables/useRules';

export const useSchemas = {
  registerSchema: z.object({
    email: z.string().min(1).max(50),
    password: z.string(),
  }),
  createMoneyDepositSchema: z.object({
    userMail: z.string().email().min(5),
    amount: z.number(),
  }),
  createBusinessSchema: z.object({
    name: z.string().min(1).max(18),
    slug: z.string(),
  }),
  getBusinessPaymentSchema: z.object({
    businessId: z.string().refine(useRules.uuid)
  })
}
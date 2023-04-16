import { z } from 'zod';

export const useSchemas = {
  registerSchema: z.object({
    email: z.string().min(1).max(50),
    password: z.string(),
  }),
  createBusinessSchema: z.object({
    name: z.string().min(1).max(18),
    slug: z.string(),
  })
}
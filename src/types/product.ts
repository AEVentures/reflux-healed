import { z } from 'zod';

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  whyMentioned: z.string(),
  category: z.string(),
  priceRange: z.string(),
  url: z.string().url(),
});

export type Product = z.infer<typeof productSchema>;

import { z } from 'zod';

export const verificationTypeOptions = [
  'founder-review',
  'community-report',
  'public-specialty',
  'paid-partner',
] as const;

export const contactSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url(),
  address: z.string().optional(),
});

export const practitionerSchema = z.object({
  id: z.string().min(1),
  addedAt: z.string().datetime(),
  name: z.string().min(1),
  credentials: z.string().optional(),
  practiceName: z.string().min(1),
  location: z.string().min(1),
  focus: z.array(z.string()).min(1),
  contact: contactSchema,
  about: z.string().min(1).max(2000),
  verification: z.object({
    type: z.enum(verificationTypeOptions),
    note: z.string().min(1),
  }),
  sourceUrl: z.string().url(),
});

export type Practitioner = z.infer<typeof practitionerSchema>;
export type VerificationType = (typeof verificationTypeOptions)[number];

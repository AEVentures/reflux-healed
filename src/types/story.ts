import { z } from 'zod';

export const conditionOptions = [
  'LPR',
  'GERD',
  'silent-reflux',
  'hiatal-hernia',
  'bile-reflux',
  'eosinophilic-esophagitis',
] as const;

export const stageOptions = [
  'newly-diagnosed',
  'investigating',
  'healing',
  'healed-mentor',
] as const;

export const symptomOptions = [
  'globus',
  'throat-clearing',
  'postnasal-drip',
  'hoarseness',
  'cough',
  'choking',
  'heartburn',
  'chest-pain',
  'nausea',
  'difficulty-swallowing',
] as const;

export const outcomeOptions = [
  'healed',
  'much-better',
  'somewhat-better',
  'still-trying',
] as const;

export const storySchema = z.object({
  id: z.string().min(1),
  publishedAt: z.string().datetime(),
  pseudonym: z.string().min(1).max(60),
  stage: z.enum(stageOptions),
  conditions: z.array(z.enum(conditionOptions)).min(1),
  symptoms: z.array(z.enum(symptomOptions)),
  yearsWithSymptoms: z.number().min(0).max(100),
  headline: z.string().min(1).max(140),
  story: z.string().min(1).max(5000),
  whatHelpedMost: z.string().min(1).max(2000),
  advice: z.string().min(1).max(2000),
  outcome: z.enum(outcomeOptions),
  hasMedicalSupervision: z.boolean(),
  tags: z.array(z.string()),
});

export const shareSchema = storySchema
  .pick({
    pseudonym: true,
    stage: true,
    conditions: true,
    symptoms: true,
    yearsWithSymptoms: true,
    headline: true,
    story: true,
    whatHelpedMost: true,
    advice: true,
    outcome: true,
    hasMedicalSupervision: true,
  })
  .extend({
    email: z.string().email().optional().or(z.literal('')),
    agreeNotMedicalAdvice: z
      .boolean()
      .refine((value) => value === true, {
        message: 'You must agree that this is personal experience, not medical advice.',
      }),
  });

export type Story = z.infer<typeof storySchema>;
export type ShareInput = z.infer<typeof shareSchema>;

export type Condition = (typeof conditionOptions)[number];
export type Symptom = (typeof symptomOptions)[number];
export type Stage = (typeof stageOptions)[number];
export type Outcome = (typeof outcomeOptions)[number];

export const SUBMISSION_EMAIL = 'stories@reflux-healed.org';

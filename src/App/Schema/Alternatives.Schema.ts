import { object, number, string, TypeOf, date, boolean } from 'zod';

export const AlternativesSchema = object({
  id: number(),
  question_id: number(),
  alternative_text: string(),
  is_correct: boolean(),
  created_at: date(),
  updated_at: date(),
});

export type AlternativesSchemaType = TypeOf<typeof AlternativesSchema>;

export const AlternativesNoResponseSchema = object({
  id: number(),
  question_id: number(),
  alternative_text: string(),
  is_correct: boolean(),
  created_at: date(),
  updated_at: date(),
});

export type AlternativesNoResponseSchemaType = TypeOf<
  typeof AlternativesNoResponseSchema
>;

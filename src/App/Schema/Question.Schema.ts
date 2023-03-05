import { object, number, string, TypeOf, date, boolean, array } from 'zod';
import {
  AlternativesNoResponseSchema,
  AlternativesSchema,
} from './Alternatives.Schema';

export const QuestionSchema = object({
  id: number(),
  question_text: string(),
  alternatives: array(AlternativesNoResponseSchema),
  wasCorrect: boolean().nullable(),
  choosenAnswerId: number().nullable(),
  created_at: date(),
  updated_at: date(),
});

export type QuestionSchemaType = TypeOf<typeof QuestionSchema>;

export const AnswerQuestionSchema = object({
  questionId: number(),
  answerId: number(),
});
export type AnswerQuestionSchemaType = TypeOf<typeof AnswerQuestionSchema>;

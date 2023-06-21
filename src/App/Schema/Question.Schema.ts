import { object, number, string, TypeOf, date, boolean, array } from 'zod';
import { AlternativesNoResponseSchema } from './Alternatives.Schema';
import { LectuerSchema } from './Lectuer.Schema';
import { TypeSchema } from './Types.schema';

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

export const GetQuestionSchema = object({
  id: number(),
  question_text: string(),
  alternatives: array(AlternativesNoResponseSchema),
  types: array(TypeSchema),
  // lectuers: array(LectuerSchema),
  created_at: date(),
  updated_at: date(),
});

export type GetQuestionSchemaType = TypeOf<typeof GetQuestionSchema>;

export const CreateQuestionSchema = object({
  questionText: string(),
});
export type CreateQuestionSchemaType = TypeOf<typeof CreateQuestionSchema>;

export const CreateQuestionSubmitSchema = object({
  lectureId: array(number()),
  questionText: string(),
  alternatives: array(
    object({
      alternativeText: string(),
      isCorrect: boolean(),
    })
  ),
});
export type CreateQuestionSchemaSubmitType = TypeOf<
  typeof CreateQuestionSubmitSchema
>;

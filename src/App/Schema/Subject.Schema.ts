import { object, number, string, TypeOf, date, array } from 'zod';
import { ChapterSchema } from './Chapter.Schema';

export const SubjectSchema = object({
  id: number(),
  subject_name: string(),
  created_at: date(),
  updated_at: date(),
  chapters: array(ChapterSchema),
});

export type SubjectSchemaType = TypeOf<typeof SubjectSchema>;

export const EditSubjectSchema = object({
  subject_name: string(),
});
export type EditSubjectSchemaType = TypeOf<typeof EditSubjectSchema>;

export const CreateSubjectSchema = object({
  subjectName: string(),
});
export type CreateSubjectSchemaType = TypeOf<typeof CreateSubjectSchema>;

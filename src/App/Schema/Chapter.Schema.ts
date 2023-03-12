import { object, number, string, TypeOf, date, array } from 'zod';
import { LectuerSchema } from './Lectuer.Schema';

export const ChapterSchema = object({
  id: number(),
  subject_id: number(),
  chapter_name: string(),
  created_at: date(),
  updated_at: date(),
  lectuers: array(LectuerSchema),
});

export type ChapterSchemaType = TypeOf<typeof ChapterSchema>;

export const CreateChapterSchema = object({
  subjectId: number(),
  chapterName: string(),
});
export type CreateChapterSchemaType = TypeOf<typeof CreateChapterSchema>;

export const EditChapterSchema = object({
  subjectId: number(),
  chapterName: string(),
});
export type EditChapterSchemaType = TypeOf<typeof EditChapterSchema>;

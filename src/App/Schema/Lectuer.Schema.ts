import { object, number, string, TypeOf, date, array } from 'zod';
import { VideoSchema } from './Video.Schema';
import { PdfSchema } from './Pdf.Schema';
import { QuestionSchema } from './Question.Schema';

export const LectuerSchema = object({
  id: number(),
  chapter_id: number(),
  video_id: number().nullable(),
  lecture_name: string(),
  created_at: date(),
  updated_at: date(),
  video: VideoSchema,
  pdfs: array(PdfSchema),
  questions: array(QuestionSchema),
});

export type LectuerSchemaType = TypeOf<typeof LectuerSchema>;

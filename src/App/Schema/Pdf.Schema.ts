import { object, number, string, TypeOf, date, array } from 'zod';

export const PdfSchema = object({
  id: number(),
  pdf_name: string(),
  pdf_url: string(),
  created_at: date(),
  updated_at: date(),
});

export type PdfSchemaType = TypeOf<typeof PdfSchema>;

export const CreatePdfSchema = object({
  lectureId: number().optional(),
  pdfName: string(),
  pdfUrl: string(),
  typesId: array(number()).optional(),
});
export type CreatePdfSchemaType = TypeOf<typeof CreatePdfSchema>;

export const EditPdfSchema = object({
  pdf_name: string(),
  pdf_url: string(),
});
export type EditPdfSchemaType = TypeOf<typeof EditPdfSchema>;

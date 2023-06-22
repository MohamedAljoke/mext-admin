import { object, number, string, TypeOf, date, array } from 'zod';
import { TypeSchema } from './Types.schema';

export const VideoSchema = object({
  id: number(),
  video_name: string(),
  video_url: string(),
  created_at: date(),
  updated_at: date(),
  types: array(TypeSchema).optional(),
});

export type VideoSchemaType = TypeOf<typeof VideoSchema>;

export const CreateVideoSchema = object({
  videoName: string(),
  videoUrl: string(),
  typesId: array(number()).optional(),
});
export type CreateVideoSchemaType = TypeOf<typeof CreateVideoSchema>;

export const EditVideoSchema = object({
  video_name: string(),
  video_url: string(),
});
export type EditVideoSchemaType = TypeOf<typeof EditVideoSchema>;

export const EditVideoSubmitSchema = object({
  id: number(),
  video_name: string(),
  video_url: string(),
  typesId: array(number()).optional(),
});
export type EditVideoSchemaSubmitType = TypeOf<typeof EditVideoSubmitSchema>;

import { object, number, string, TypeOf, date, array } from 'zod';

export const VideoSchema = object({
  id: number(),
  video_name: string(),
  video_url: string(),
  created_at: date(),
  updated_at: date(),
});

export type VideoSchemaType = TypeOf<typeof VideoSchema>;

export const CreateVideoSchema = object({
  videoName: string(),
  videoUrl: string(),
  typesId: array(number()).optional(),
});
export type CreateVideoSchemaType = TypeOf<typeof CreateVideoSchema>;

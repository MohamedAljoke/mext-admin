import { object, number, string, TypeOf, date, array } from 'zod';

export const TypeSchema = object({
  id: number(),
  type_name: string(),
  created_at: date(),
  updated_at: date(),
});

export type TypeSchemaType = TypeOf<typeof TypeSchema>;

export const CreateTypeSchema = object({
  typeName: string(),
});
export type CreateTypeSchemaType = TypeOf<typeof CreateTypeSchema>;

export const EditTypeSchema = object({
  type_name: string(),
});
export type EditTypeSchemaType = TypeOf<typeof EditTypeSchema>;

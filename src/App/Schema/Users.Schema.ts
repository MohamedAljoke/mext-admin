import { object, number, string, TypeOf, date, array } from 'zod';

export const UserSchema = object({
  id: number(),
  email: string(),
  name: string(),
  created_at: date(),
  updated_at: date(),
});
export type UserSchemaType = TypeOf<typeof UserSchema>;

export const EditUserSchema = object({
  name: string(),
  email: string(),
});

export type EditUserSchemaType = TypeOf<typeof EditUserSchema>;

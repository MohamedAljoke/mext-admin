import { object, number, string, TypeOf, date } from 'zod';

export const LoginSchema = object({
  email: string()
    .min(1, 'Email is required')
    .email({ message: 'must be email' })
    .max(155, 'max.caracteres 80'),
  password: string()
    .min(8, { message: 'Password must be longer than 8' })
    .max(155, 'max.caracteres 50'),
});

export type LoginSchemaType = TypeOf<typeof LoginSchema>;

export const LoginResponseSchema = object({
  id: number(),
  type: string(),
  token: string(),
  expires_at: string(),
  name: string(),
  email: string(),
});

export type LoginResponseType = TypeOf<typeof LoginResponseSchema>;

export const RegisterSchema = object({
  name: string().min(1, 'Name is required').max(155, 'max.caracteres 80'),
  email: string()
    .min(1, 'Email is required')
    .email({ message: 'must be email' }),
  password: string()
    .min(8, { message: 'Password must be longer than 8' })
    .max(155, 'max.caracteres 50')
    .optional(),
  password_confirmation: string()
    .min(8, { message: 'password confirmation must be longer than 8' })
    .max(155, 'max.caracteres 50')
    .optional(),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Passwords do not match',
});

export type RegisterSchemaType = TypeOf<typeof RegisterSchema>;

export const RegisterResponseSchema = object({
  id: number(),
  email: string(),
  name: string(),
  created_at: date(),
  updated_at: date(),
});
export type RegisterResponseType = TypeOf<typeof RegisterResponseSchema>;

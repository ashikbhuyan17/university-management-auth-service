import { z } from 'zod';

const createStudentsZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
  }),
});

export const StudentsValidation = {
  createStudentsZodSchema,
};

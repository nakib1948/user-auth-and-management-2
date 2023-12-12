import { z } from 'zod';

const categoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'name must be string',
        required_error: 'name is required',
      })
      .min(1, { message: 'name must be at least one character long' }),
  }),
});

export const categoryValidation = {
  categoryValidationSchema,
};

import { z } from 'zod';

const courseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'title must be string',
      required_error: 'title is required',
    }),
    instructor: z.string({
      invalid_type_error: 'instructor must be string',
      required_error: 'instructor is required',
    }),
    categoryId: z.string({
      invalid_type_error: 'categoryId must be string',
      required_error: 'categoryId is required',
    }),
    price: z.number({
      invalid_type_error: 'price must be number',
      required_error: 'price is required',
    }),
    tags: z.array(
      z.object({
        name: z.string({
          invalid_type_error: 'name must be string',
          required_error: 'name is required',
        }),
        isDeleted: z.boolean({
          invalid_type_error: 'isDeleted must be boolean',
          required_error: 'isDeleted is required',
        }),
      }),
    ),
    startDate: z.string({
      invalid_type_error: 'startDate must be string',
      required_error: 'startDate is required',
    }),
    endDate: z.string({
      invalid_type_error: 'endDate must be string',
      required_error: 'endDate is required',
    }),
    language: z.string({
      invalid_type_error: 'language must be string',
      required_error: 'language is required',
    }),
    provider: z.string({
      invalid_type_error: 'provider must be string',
      required_error: 'provider is required',
    }),
    details: z.array(
      z.object({
        level: z.string({
          invalid_type_error: 'level must be string',
          required_error: 'level is required',
        }),
        description: z.string({
          invalid_type_error: 'description must be boolean',
          required_error: 'description is required',
        }),
      }),
    ),
  }),
});

export const courseValidation = {
  courseValidationSchema,
};

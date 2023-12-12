import { z } from 'zod';

const reviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string({
      invalid_type_error: 'courseId must be string',
      required_error: 'courseId is required',
    }),
    rating: z.number({
      invalid_type_error: 'rating must be number',
      required_error: 'rating is required',
    }),
    review: z.string({
      invalid_type_error: 'review must be string',
      required_error: 'review is required',
    }),
  }),
});

export const reviewValidation = {
    reviewValidationSchema,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidation = void 0;
const zod_1 = require("zod");
const reviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: zod_1.z.string({
            invalid_type_error: 'courseId must be string',
            required_error: 'courseId is required',
        }),
        rating: zod_1.z.number({
            invalid_type_error: 'rating must be number',
            required_error: 'rating is required',
        }),
        review: zod_1.z.string({
            invalid_type_error: 'review must be string',
            required_error: 'review is required',
        }),
    }),
});
exports.reviewValidation = {
    reviewValidationSchema,
};

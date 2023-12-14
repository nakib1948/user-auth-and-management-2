"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const zod_1 = require("zod");
const categoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: 'name must be string',
            required_error: 'name is required',
        })
            .min(1, { message: 'name must be at least one character long' }),
    }),
});
exports.categoryValidation = {
    categoryValidationSchema,
};

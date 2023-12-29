"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({
            invalid_type_error: 'username must be string',
            required_error: 'username is required',
        }),
        email: zod_1.z
            .string({
            invalid_type_error: 'email must be string',
            required_error: 'email is required',
        })
            .email({ message: 'Invalid email address' }),
        password: zod_1.z
            .string({
            invalid_type_error: 'password must be string',
            required_error: 'password is required',
        })
            .min(6, { message: 'Password must be at least 6 characters long' })
            .max(20, { message: 'Password must be less than 20 characters long' }),
        role: zod_1.z.enum([...user_constant_1.UserRole]),
    }),
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({ required_error: 'username is required.' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string({
            required_error: 'current password is required',
        }),
        newPassword: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, { message: 'Password must be at least 6 characters long' })
            .max(20, { message: 'Password must be less than 20 characters long' }),
    }),
});
exports.UserValidation = {
    userValidationSchema,
    loginValidationSchema,
    changePasswordValidationSchema,
};

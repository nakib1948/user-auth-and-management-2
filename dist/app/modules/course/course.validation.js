"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidation = void 0;
const zod_1 = require("zod");
const courseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            invalid_type_error: 'title must be string',
            required_error: 'title is required',
        }),
        instructor: zod_1.z.string({
            invalid_type_error: 'instructor must be string',
            required_error: 'instructor is required',
        }),
        categoryId: zod_1.z.string({
            invalid_type_error: 'categoryId must be string',
            required_error: 'categoryId is required',
        }),
        price: zod_1.z.number({
            invalid_type_error: 'price must be number',
            required_error: 'price is required',
        }),
        tags: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string({
                invalid_type_error: 'name must be string',
                required_error: 'name is required',
            }),
            isDeleted: zod_1.z.boolean({
                invalid_type_error: 'isDeleted must be boolean',
                required_error: 'isDeleted is required',
            }),
        })),
        startDate: zod_1.z.string({
            invalid_type_error: 'startDate must be string',
            required_error: 'startDate is required',
        }),
        endDate: zod_1.z.string({
            invalid_type_error: 'endDate must be string',
            required_error: 'endDate is required',
        }),
        language: zod_1.z.string({
            invalid_type_error: 'language must be string',
            required_error: 'language is required',
        }),
        provider: zod_1.z.string({
            invalid_type_error: 'provider must be string',
            required_error: 'provider is required',
        }),
        details: zod_1.z.object({
            level: zod_1.z.string({
                invalid_type_error: 'level must be string',
                required_error: 'level is required',
            }),
            description: zod_1.z.string({
                invalid_type_error: 'description must be boolean',
                required_error: 'description is required',
            }),
        }),
    }),
});
const updateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            invalid_type_error: 'title must be string',
        })
            .optional(),
        instructor: zod_1.z
            .string({
            invalid_type_error: 'instructor must be string',
        })
            .optional(),
        categoryId: zod_1.z
            .string({
            invalid_type_error: 'categoryId must be string',
        })
            .optional(),
        price: zod_1.z
            .number({
            invalid_type_error: 'price must be number',
        })
            .optional(),
        tags: zod_1.z
            .array(zod_1.z
            .object({
            name: zod_1.z.string({
                invalid_type_error: 'name must be string',
            }),
            isDeleted: zod_1.z.boolean({
                invalid_type_error: 'isDeleted must be boolean',
            }),
        })
            .optional())
            .optional(),
        startDate: zod_1.z
            .string({
            invalid_type_error: 'startDate must be string',
        })
            .optional(),
        endDate: zod_1.z
            .string({
            invalid_type_error: 'endDate must be string',
        })
            .optional(),
        language: zod_1.z
            .string({
            invalid_type_error: 'language must be string',
        })
            .optional(),
        provider: zod_1.z
            .string({
            invalid_type_error: 'provider must be string',
        })
            .optional(),
        details: zod_1.z
            .object({
            level: zod_1.z
                .string({
                invalid_type_error: 'level must be string',
            })
                .optional(),
            description: zod_1.z
                .string({
                invalid_type_error: 'description must be string',
            })
                .optional(),
        })
            .optional(),
    }),
});
exports.courseValidation = {
    courseValidationSchema,
    updateCourseValidationSchema,
};

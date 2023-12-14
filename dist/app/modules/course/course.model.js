"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const tagsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
    },
}, { _id: false });
const detailsSchema = new mongoose_1.Schema({
    level: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
    },
    price: {
        type: Number,
        required: true,
    },
    tags: {
        type: [tagsSchema],
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    durationInWeeks: { type: Number },
    details: detailsSchema,
    reviews: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
});
exports.Course = (0, mongoose_1.model)('Course', courseSchema);

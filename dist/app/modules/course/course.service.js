"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseServices = void 0;
const course_model_1 = require("./course.model");
const mongoose_1 = require("mongoose");
const review_model_1 = require("../review/review.model");
const WeekCalculation_1 = require("../../utils/WeekCalculation");
const createCourseIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const durationInWeeks = yield (0, WeekCalculation_1.numberOfWeeks)(payload === null || payload === void 0 ? void 0 : payload.startDate, payload === null || payload === void 0 ? void 0 : payload.endDate);
    payload.durationInWeeks = durationInWeeks;
    payload.createdBy = user._id;
    const result = yield course_model_1.Course.create(payload);
    const _a = result.toObject(), { reviews } = _a, rest = __rest(_a, ["reviews"]);
    return rest;
});
const getAllCourseFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, query);
    let result;
    const pageNumber = parseInt(query.page) || 1;
    const limitNumber = parseInt(query.limit) || 10;
    const startIndex = (pageNumber - 1) * limitNumber;
    if (query.sortOrder && query.sortBy) {
        const sortField = query.sortBy;
        const sortOrder = query.sortOrder === 'desc' ? -1 : 1;
        const sort = {
            [sortField]: sortOrder,
        };
        result = yield course_model_1.Course.find()
            .populate('createdBy', { _id: 1, username: 1, email: 1, role: 1 })
            .sort(sort)
            .skip(startIndex)
            .limit(limitNumber);
    }
    else if (query.sortBy) {
        const sortField = queryObj.sortBy;
        const sort = {
            [sortField]: 1,
        };
        result = yield course_model_1.Course.find()
            .populate('createdBy', { _id: 1, username: 1, email: 1, role: 1 })
            .sort(sort)
            .skip(startIndex)
            .limit(limitNumber);
    }
    else if (query.minPrice) {
        result = yield course_model_1.Course.find({
            price: { $gte: Number(query.minPrice), $lte: Number(query.maxPrice) },
        })
            .populate('createdBy', { _id: 1, username: 1, email: 1, role: 1 })
            .skip(startIndex)
            .limit(limitNumber);
    }
    else if (query.tags) {
        result = yield course_model_1.Course.find({ 'tags.name': { $in: query.tags } })
            .populate('createdBy', { _id: 1, username: 1, email: 1, role: 1 })
            .skip(startIndex)
            .limit(limitNumber);
    }
    else if (query.startDate) {
        result = yield course_model_1.Course.find({
            startDate: { $gte: query.startDate },
            endDate: { $lte: query.endDate },
        })
            .populate('createdBy', { _id: 1, username: 1, email: 1, role: 1 })
            .skip(startIndex)
            .limit(limitNumber);
    }
    else if (query.language || query.provider || query.durationInWeeks) {
        result = yield course_model_1.Course.find(query)
            .populate('createdBy', { _id: 1, username: 1, email: 1, role: 1 })
            .skip(startIndex)
            .limit(limitNumber);
    }
    else if (query.level) {
        result = yield course_model_1.Course.find({ 'details.level': query.level })
            .populate('createdBy', { _id: 1, username: 1, email: 1, role: 1 })
            .skip(startIndex)
            .limit(limitNumber);
    }
    else {
        result = yield course_model_1.Course.find()
            .populate('createdBy', { _id: 1, username: 1, email: 1, role: 1 })
            .skip(startIndex)
            .limit(limitNumber);
    }
    const meta = {
        page: parseInt(query.page) || 1,
        limit: parseInt(query.limit) || 10,
        total: result.length,
    };
    return { result, meta };
});
const getBestCourseFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.aggregate([
        {
            $group: {
                _id: '$courseId',
                averageRating: { $avg: '$rating' },
                reviewCount: { $sum: 1 },
            },
        },
        {
            $sort: { averageRating: -1 },
        },
        {
            $limit: 1,
        },
    ]);
    const { _id, averageRating, reviewCount } = result[0];
    const findCourse = yield course_model_1.Course.findById(_id).lean();
    const { reviews } = findCourse, rest = __rest(findCourse, ["reviews"]);
    rest.averageRating = Number(averageRating.toFixed(1));
    rest.reviewCount = reviewCount;
    return rest;
});
const updateCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { tags, details } = payload, courseRemainingData = __rest(payload, ["tags", "details"]);
    const modifiedCourseData = Object.assign({}, courseRemainingData);
    if (details && Object.keys(details).length) {
        for (const [key, value] of Object.entries(details)) {
            modifiedCourseData[`details.${key}`] = value;
        }
    }
    const updateSimpleCourseInfo = yield course_model_1.Course.findByIdAndUpdate(id, modifiedCourseData, {
        new: true,
        runValidators: true,
    });
    if (tags && tags.length > 0) {
        const deletedTags = tags
            .filter((val) => val.isDeleted)
            .map((val) => val.name);
        const deletedTrueTags = yield course_model_1.Course.findByIdAndUpdate(id, {
            $pull: { tags: { name: { $in: deletedTags } } },
        });
        const newTags = tags.filter((val) => !val.isDeleted);
        const newTagsToDB = yield course_model_1.Course.findByIdAndUpdate(id, {
            $addToSet: { tags: { $each: newTags } },
        });
    }
    const result = yield course_model_1.Course.findById(id)
        .populate('createdBy', { _id: 1, username: 1, email: 1, role: 1 })
        .lean();
    const { review } = result, rest = __rest(result, ["review"]);
    return rest;
});
const getCourseWithReviews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.aggregate([
        {
            $match: { _id: new mongoose_1.Types.ObjectId(id) },
        },
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'courseId',
                as: 'reviews',
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'createdBy',
                foreignField: '_id',
                as: 'createdBy',
            },
        },
        {
            $project: {
                createdBy: {
                    password: 0,
                    previousPassword: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                },
                reviews: {
                    _id: 0,
                    __v: 0,
                },
            },
        },
    ]);
    return result[0];
});
exports.courseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    updateCourseIntoDB,
    getCourseWithReviews,
    getBestCourseFromDB,
};

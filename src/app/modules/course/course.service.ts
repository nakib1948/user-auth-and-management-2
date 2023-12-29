import { JwtPayload } from 'jsonwebtoken';
import { populate } from 'dotenv';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import mongoose, { Schema, model, Types } from 'mongoose';
import { Review } from '../review/review.model';
import { numberOfWeeks } from '../../utils/WeekCalculation';
const createCourseIntoDB = async (payload: TCourse, user: JwtPayload) => {
  const durationInWeeks = await numberOfWeeks(
    payload?.startDate,
    payload?.endDate,
  );
  payload.durationInWeeks = durationInWeeks;
  payload.createdBy = user._id;
  const result = await Course.create(payload);

  const { reviews, ...rest } = result.toObject();

  return rest;
};

const getAllCourseFromDB = async (query: any) => {
  const queryObj = { ...query };
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

    result = await Course.find().populate('createdBy', { _id: 1,username:1,email:1,role:1 }).sort(sort).skip(startIndex).limit(limitNumber);
  } else if (query.sortBy) {
    const sortField = queryObj.sortBy;
    const sort = {
      [sortField]: 1,
    };

    result = await Course.find().populate('createdBy', { _id: 1,username:1,email:1,role:1 }).sort(sort).skip(startIndex).limit(limitNumber);
  } else if (query.minPrice) {
    result = await Course.find({
      price: { $gte: Number(query.minPrice), $lte: Number(query.maxPrice) },
    }).populate('createdBy', { _id: 1,username:1,email:1,role:1 })
      .skip(startIndex)
      .limit(limitNumber);
  } else if (query.tags) {
    result = await Course.find({ 'tags.name': { $in: query.tags } }).populate('createdBy', { _id: 1,username:1,email:1,role:1 })
      .skip(startIndex)
      .limit(limitNumber);
  } else if (query.startDate) {
    result = await Course.find({
      startDate: { $gte: query.startDate },
      endDate: { $lte: query.endDate },
    }).populate('createdBy', { _id: 1,username:1,email:1,role:1 })
      .skip(startIndex)
      .limit(limitNumber);
  } else if (query.language || query.provider || query.durationInWeeks) {
    result = await Course.find(query).populate('createdBy', { _id: 1,username:1,email:1,role:1 }).skip(startIndex).limit(limitNumber);
  } else if (query.level) {
    result = await Course.find({ 'details.level': query.level }).populate('createdBy', { _id: 1,username:1,email:1,role:1 })
      .skip(startIndex)
      .limit(limitNumber);
  } else {
   
    result = await Course.find().populate('createdBy', { _id: 1,username:1,email:1,role:1 }).skip(startIndex).limit(limitNumber);
  }
  
  const meta = {
    page: parseInt(query.page) || 1,
    limit: parseInt(query.limit) || 10,
    total: result.length,
  };

  return { result, meta };
};
const getBestCourseFromDB = async () => {
  const result = await Review.aggregate([
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

  const findCourse = await Course.findById(_id).lean();

  const { reviews, ...rest } = findCourse;
  rest.averageRating = Number(averageRating.toFixed(1));
  rest.reviewCount = reviewCount;
  return rest;
};
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...courseRemainingData } = payload;

  const modifiedCourseData: Record<string, unknown> = {
    ...courseRemainingData,
  };
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedCourseData[`details.${key}`] = value;
    }
  }
  const updateSimpleCourseInfo = await Course.findByIdAndUpdate(
    id,
    modifiedCourseData,
    {
      new: true,
      runValidators: true,
    },
  );
  if (tags && tags.length > 0) {
    const deletedTags = tags
      .filter((val) => val.isDeleted)
      .map((val) => val.name);
    const deletedTrueTags = await Course.findByIdAndUpdate(id, {
      $pull: { tags: { name: { $in: deletedTags } } },
    });

    const newTags = tags.filter((val) => !val.isDeleted);
    const newTagsToDB = await Course.findByIdAndUpdate(id, {
      $addToSet: { tags: { $each: newTags } },
    });
  }
  const result = await Course.findById(id).populate('createdBy', { _id: 1,username:1,email:1,role:1 }).lean();
  const { review, ...rest } = result;
  return rest;
};

const getCourseWithReviews = async (id: string) => {
  const result = await Course.aggregate([
    {
      $match: { _id: new Types.ObjectId(id) },
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
      $project: {
        reviews: {
          _id: 0,
          __v: 0,
        },
      },
    },
  ]);

  return result[0];
};

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  updateCourseIntoDB,
  getCourseWithReviews,
  getBestCourseFromDB,
};

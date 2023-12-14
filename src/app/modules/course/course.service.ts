import { populate } from 'dotenv';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import mongoose, { Schema, model, Types } from 'mongoose';
const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async () => {
  const result = await Course.find();
  return result;
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
  const result = await Course.findById(id);
  return result;
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
};

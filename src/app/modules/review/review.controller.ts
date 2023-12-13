import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { reviewServices } from './review.service';
import sendResponse from '../../utils/sendResponse';

const createReview = catchAsync(async (req, res) => {
  const result = await reviewServices.createReviewIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Review created successfully',
    data: result,
  });
});

const getAllReview = catchAsync(async (req, res) => {
  const result = await reviewServices.getAllReviewFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review retrieved successfully',
    data: result,
  });
});

export const reviewControllers = {
  createReview,
  getAllReview,
};

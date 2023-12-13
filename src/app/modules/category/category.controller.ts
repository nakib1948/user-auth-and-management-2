import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { categoryServices } from './category.service';
import sendResponse from '../../utils/sendResponse';

const createCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoryFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category retrieved successfully',
    data: result,
  });
});

export const categoryControllers = {
  createCategory,
  getAllCategory,
};

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successful',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await UserServices.changePassword(req.user, req.body);
  

  if (result.success) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password changed successfully',
      data: result.data,
    });
  } else {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message:
        `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${result.data}).`,
      data: null,
    });
  }
});

export const userControllers = {
  createUser,
  loginUser,
  changePassword,
};

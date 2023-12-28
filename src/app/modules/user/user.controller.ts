import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";


const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User registered successfully',
      data: result,
    });
  });
  const loginUser = catchAsync(async(req,res)=>{
    const result = await UserServices.loginUser(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'User login successful',
        data:result
    })
})

  export const userControllers = {
    createUser,
    loginUser
  };
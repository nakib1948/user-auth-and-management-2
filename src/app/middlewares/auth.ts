import { TUserRole } from './../modules/user/user.interface';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import sendResponse from '../utils/sendResponse';
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized Access',
        errorMessage:
          'You do not have the necessary permissions to access this resource.',
        errorDetails: null,
        stack: null,
      });
    }
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          return res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            message: 'Unauthorized Access',
            errorMessage:
              'You do not have the necessary permissions to access this resource.',
            errorDetails: null,
            stack: null,
          });
        }
        const role = (decoded as JwtPayload).role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          return res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            message: 'Unauthorized Access',
            errorMessage:
              'You do not have the necessary permissions to access this resource.',
            errorDetails: null,
            stack: null,
          });
        }
        req.user = decoded as JwtPayload;
        next();
      },
    );

  });
};

export default auth;

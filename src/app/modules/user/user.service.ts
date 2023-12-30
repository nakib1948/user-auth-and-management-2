import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { comparePassword } from './user.utils';
const createUserIntoDB = async (payload: TUser) => {
  payload.previousPassword = {
    firstPassword: '',
    secondPassword: '',
  };
  const result = await User.create(payload);
  const { password, previousPassword, ...rest } = result.toObject();
  return rest;
};
const loginUser = async (payload: TLoginUser) => {
  const isUserExists = await User.findOne({ username: payload.username });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  if (payload.password !== isUserExists?.password) {
    throw new AppError(httpStatus.FORBIDDEN, 'password donot matched!');
  }
  const jwtPayload = {
    _id: isUserExists._id,
    role: isUserExists.role,
    email: isUserExists.email,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
    expiresIn: '10d',
  });
  const userData = {
    _id: isUserExists._id,
    username: isUserExists.username,
    email: isUserExists.email,
    role: isUserExists.role,
  };

  return {
    user: userData,
    token: accessToken,
  };
};

const changePassword = async (user: JwtPayload, payload) => {
  const getUser = await User.findOne({ email: user.email });

  if (getUser?.password !== payload.currentPassword) {
    throw new AppError(httpStatus.FORBIDDEN, 'currentPassword does not match!');
  }

  if (
    payload.newPassword === getUser?.previousPassword.firstPassword ||
    payload.newPassword === getUser?.previousPassword.secondPassword ||
    payload.currentPassword === payload.newPassword
  ) {
    const formattedDateTimeString = new Date().toISOString();
    return { data: formattedDateTimeString, success: false };
  }

  const updatedPassword = payload.newPassword;

  const previousPassword = {
    firstPassword: getUser?.previousPassword.secondPassword,
    secondPassword: getUser?.password,
  };

  const result = await User.findOneAndUpdate(
    { email: user.email },
    { password: updatedPassword, previousPassword },
    { new: true, lean: true },
  );

  const userData = {
    _id: result._id,
    username: result.username,
    email: result.email,
    role: result.role,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };

  return { data: userData, success: true };
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
  changePassword,
};

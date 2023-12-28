import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  const { password, ...rest } = result.toObject();
  return rest;
};
const loginUser = async (payload: TLoginUser) => {
  const isUserExists = await User.findOne({ username: payload.username });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExists?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'password donot matched!');
  }
  const jwtPayload = {
    username: isUserExists.username,
    role: isUserExists.role,
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

export const UserServices = {
  createUserIntoDB,
  loginUser,
};

import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
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

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExists?.password,
  );
  if (!isPasswordMatched) {
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
  const isPasswordMatched = await bcrypt.compare(
    payload.currentPassword,
    getUser?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'currentPassword donot matched!');
  }

  const previousPasswordMatched1 = await bcrypt.compare(
    payload.newPassword,
    getUser?.previousPassword.firstPassword,
  );
  const previousPasswordMatched2 = await bcrypt.compare(
    payload.newPassword,
    getUser?.previousPassword.secondPassword,
  );
  if (
    previousPasswordMatched1 ||
    previousPasswordMatched2 ||
    payload.currentPassword === payload.newPassword
  ) {
    const inputDateString = getUser?.updatedAt;
    const inputDate = new Date(inputDateString);

    const optionsDate = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    
    const optionsTime = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    
    const formattedDateString = inputDate.toLocaleDateString('en-US', optionsDate);
    const formattedTimeString = inputDate.toLocaleTimeString('en-US', optionsTime);
    
    const formattedDateTimeString = `${formattedDateString} at ${formattedTimeString}`;
    return { data: formattedDateTimeString, success: false };
  }
  const updatedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  const previousPassword = {
    firstPassword: getUser?.previousPassword.secondPassword,
    secondPassword: getUser?.password,
  };
  const result = await User.findOneAndUpdate(
    {
      email: user.email,
    },
    {
      password: updatedPassword,
      previousPassword: previousPassword,
    },
  ).lean();

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

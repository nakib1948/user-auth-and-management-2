import { User } from '../user/user.model';
import { TReview } from './review.interface';
import { Review } from './review.model';
import { JwtPayload } from 'jsonwebtoken';

const createReviewIntoDB = async (payload: TReview, user: JwtPayload) => {
  payload.createdBy = user._id;
  const getUser =await User.findById(user._id)
 
  const result = await Review.create(payload);
  const {createdBy,...rest} = result.toObject();
  rest.createdBy = {
      _id:user._id,
      username: getUser?.username,
      email:user.email,
      role:user.role
  }
  return rest;
};

const getAllReviewFromDB = async () => {
  const result = await Review.find();
  return result;
};

export const reviewServices = {
  createReviewIntoDB,
  getAllReviewFromDB,
};

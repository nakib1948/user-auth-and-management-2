import { Types } from 'mongoose';
import {JwtPayload} from "jsonwebtoken"
export type TTags = {
  name: string;
  isDeleted: boolean;
};
export type TDetails = {
  level: string;
  description: string;
};
export type TReview = {
  courseId: Types.ObjectId;
  rating: number;
  review: string;
};
export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: [TTags];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: TDetails;
  createdBy: Types.ObjectId;
  reviews: TReview[];
};

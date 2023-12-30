import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    previousPassword: {
      firstPassword: String,
      secondPassword: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);

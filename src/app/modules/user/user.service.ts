import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  const { password, ...rest } = result.toObject();
  return rest;
};


export const UserServices = {
    createUserIntoDB
}
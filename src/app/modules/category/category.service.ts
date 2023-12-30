import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (payload: TCategory, user: JwtPayload) => {
  payload.createdBy = user._id;
  const result = await Category.create(payload);
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await Category.find().populate('createdBy', { _id: 1, username: 1, email: 1, role: 1 });
  return result;
};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
};

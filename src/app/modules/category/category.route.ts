import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { categoryValidation } from './category.validation';
import { categoryControllers } from './category.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/', auth(USER_ROLE.admin),
  validateRequest(categoryValidation.categoryValidationSchema),
  categoryControllers.createCategory,
);
router.get('/', categoryControllers.getAllCategory);

export const categoryRoutes = router;

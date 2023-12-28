import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { userControllers } from './user.controller';
import { USER_ROLE } from './user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  userControllers.createUser,
);
router.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  userControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidation.changePasswordValidationSchema),
  userControllers.changePassword,
);

export const userRoutes = router;

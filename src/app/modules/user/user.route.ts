import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { userControllers } from './user.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  userControllers.createUser,
);

export const userRoutes = router;
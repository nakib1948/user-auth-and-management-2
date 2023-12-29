import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { reviewValidation } from './review.validation';
import { reviewControllers } from './review.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(reviewValidation.reviewValidationSchema),
  reviewControllers.createReview,
);
router.get('/', reviewControllers.getAllReview);

export const reviewRoutes = router;

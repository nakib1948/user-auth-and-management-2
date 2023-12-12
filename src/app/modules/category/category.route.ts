import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { categoryValidation } from './category.validation';
import { categoryControllers } from './category.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(categoryValidation.categoryValidationSchema),
  categoryControllers.createCategory,
);

export const categoryRoutes = router;

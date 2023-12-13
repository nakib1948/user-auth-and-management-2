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
router.get('/',categoryControllers.getAllCategory)

export const categoryRoutes = router;

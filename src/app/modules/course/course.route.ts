import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/course',
  validateRequest(courseValidation.courseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/courses', CourseControllers.getAllCourse);
router.get('/courses/:courseId/reviews', CourseControllers.getCourseWithReview);
router.get('/course/best', CourseControllers.getBestCourse);
router.put(
  '/courses/:courseId',
  validateRequest(courseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

export const courseRoutes = router;

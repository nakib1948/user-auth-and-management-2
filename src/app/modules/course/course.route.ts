import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
import { CourseControllers } from './course.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/courses',
  auth(USER_ROLE.admin),
  validateRequest(courseValidation.courseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/courses', CourseControllers.getAllCourse);
router.get('/courses/:courseId/reviews', CourseControllers.getCourseWithReview);
router.get('/course/best', CourseControllers.getBestCourse);
router.put(
  '/courses/:courseId', auth(USER_ROLE.admin),
  validateRequest(courseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

export const courseRoutes = router;

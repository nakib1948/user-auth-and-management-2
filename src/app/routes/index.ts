import { Router } from 'express';
import { categoryRoutes } from '../modules/category/category.route';
import { courseRoutes } from '../modules/course/course.route';
import { reviewRoutes } from '../modules/review/review.route';
import { userRoutes } from '../modules/user/user.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: courseRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/reviews',
    route: reviewRoutes,
  },
  {
    path: '/auth',
    route: userRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

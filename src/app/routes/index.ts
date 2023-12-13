import { Router } from 'express';
import { categoryRoutes } from '../modules/category/category.route';
import { courseRoutes } from '../modules/course/course.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/course',
    route: courseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

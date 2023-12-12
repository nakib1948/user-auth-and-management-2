import { Router } from 'express';
const router = Router();

const router = Router();

const moduleRoutes = [
  {
    path: '/course',
    route: course,
  },
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
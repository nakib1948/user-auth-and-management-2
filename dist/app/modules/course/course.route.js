"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const router = express_1.default.Router();
router.post('/course', (0, validateRequest_1.default)(course_validation_1.courseValidation.courseValidationSchema), course_controller_1.CourseControllers.createCourse);
router.get('/courses', course_controller_1.CourseControllers.getAllCourse);
router.get('/courses/:courseId/reviews', course_controller_1.CourseControllers.getCourseWithReview);
router.get('/course/best', course_controller_1.CourseControllers.getBestCourse);
router.put('/courses/:courseId', (0, validateRequest_1.default)(course_validation_1.courseValidation.updateCourseValidationSchema), course_controller_1.CourseControllers.updateCourse);
exports.courseRoutes = router;

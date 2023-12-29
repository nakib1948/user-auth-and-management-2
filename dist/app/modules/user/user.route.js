"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const user_constant_1 = require("./user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(user_validation_1.UserValidation.userValidationSchema), user_controller_1.userControllers.createUser);
router.post('/login', (0, validateRequest_1.default)(user_validation_1.UserValidation.loginValidationSchema), user_controller_1.userControllers.loginUser);
router.post('/change-password', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(user_validation_1.UserValidation.changePasswordValidationSchema), user_controller_1.userControllers.changePassword);
exports.userRoutes = router;

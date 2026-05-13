"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = require("../middlewares/asyncHandler");
const authMidlleware_1 = require("../middlewares/authMidlleware");
const loginController_1 = require("../controllers/auth/loginController");
const signupController_1 = require("../controllers/auth/signupController");
const verifyEmailController_1 = require("../controllers/auth/verifyEmailController");
const passwordController_1 = require("../controllers/auth/passwordController");
const userByEmailController_1 = require("../controllers/user/userByEmailController");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post('/signup', (0, asyncHandler_1.asyncHandler)(signupController_1.signup));
router.get('/verify', (0, asyncHandler_1.asyncHandler)(verifyEmailController_1.verifyEmail));
router.post('/login', (0, asyncHandler_1.asyncHandler)(loginController_1.login));
router.post('/forgot-password', (0, asyncHandler_1.asyncHandler)(passwordController_1.forgotPassword));
router.post('/reset-password', (0, asyncHandler_1.asyncHandler)(passwordController_1.resetPassword));
router.post("/resend-verification", verifyEmailController_1.resendVerificationController);
router.post('/resend-verification-reset', passwordController_1.resendVerificationResetController);
router.get('/get-user-by-email', (0, asyncHandler_1.asyncHandler)(userByEmailController_1.getUserByEmail));
// obligé d'utilisé authMiddleware pour pouvoir recuperer le user par la suite
router.post('/business-by-user', authMidlleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(authController_1.createBusinessController));
router.get('/get-business-by-user', authMidlleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(authController_1.getBusinessByUserController));
exports.default = router;

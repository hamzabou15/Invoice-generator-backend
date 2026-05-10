import express from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { authMiddleware } from '../middlewares/authMidlleware';
import { login } from '../controllers/auth/loginController';
import { signup } from '../controllers/auth/signupController';
import { resendVerificationController, verifyEmail } from '../controllers/auth/verifyEmailController';
import { forgotPassword, resendVerificationResetController, resetPassword } from '../controllers/auth/passwordController';
import { getUserByEmail } from '../controllers/user/userByEmailController';
import { createBusinessController, getBusinessByUserController } from '../controllers/authController';

const router = express.Router();


router.post('/signup', asyncHandler(signup));
router.get('/verify', asyncHandler(verifyEmail));
router.post('/login', asyncHandler(login));
router.post('/forgot-password', asyncHandler(forgotPassword));
router.post('/reset-password', asyncHandler(resetPassword));
router.post("/resend-verification", resendVerificationController);
router.post('/resend-verification-reset', resendVerificationResetController);
router.get('/get-user-by-email', asyncHandler(getUserByEmail));
// obligé d'utilisé authMiddleware pour pouvoir recuperer le user par la suite
router.post('/business-by-user', authMiddleware, asyncHandler(createBusinessController));
router.get('/get-business-by-user', authMiddleware, asyncHandler(getBusinessByUserController));






export default router;

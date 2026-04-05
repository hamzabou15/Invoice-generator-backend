import express from 'express';
import { verifyEmail, signup, login, forgotPassword, resetPassword, resendVerificationController, resendVerificationResetController, getUserByEmail } from '../controllers/authController';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = express.Router();


router.post('/signup', asyncHandler(signup));
router.get('/verify', asyncHandler(verifyEmail));
router.post('/login', asyncHandler(login));
router.post('/forgot-password', asyncHandler(forgotPassword));
router.post('/reset-password', asyncHandler(resetPassword));
router.post("/resend-verification", resendVerificationController);
router.post('/resend-verification-reset', resendVerificationResetController);
router.get('/get-user-by-email', asyncHandler(getUserByEmail));






export default router;

import express from 'express';
import { verifyEmail, signup, login, forgotPassword, resetPassword, resendVerificationController, resendVerificationResetController, getUserByEmail, createBusinessController, getMe, getBusinessByUserController, updateUserInformationsController } from '../controllers/authController';
import { asyncHandler } from '../middlewares/asyncHandler';
import { authMiddleware } from '../middlewares/authMidlleware';

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
router.get('/getMe', authMiddleware, asyncHandler(getMe));
router.get('/get-business-by-user', authMiddleware, asyncHandler(getBusinessByUserController));
router.put(
    "/update-user",
    authMiddleware,
    updateUserInformationsController
)








export default router;

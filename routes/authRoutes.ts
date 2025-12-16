import express from 'express';
import { verifyEmail, signup, login, forgotPassword, resetPassword } from '../controllers/authController';

const router = express.Router();


router.post('/signup', signup);
router.get('/verify', verifyEmail);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);






export default router;

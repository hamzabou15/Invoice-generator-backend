import express from 'express';
import { verifyEmail, signup, login } from '../controllers/authController';

const router = express.Router();


router.post('/signup', signup);
router.get('/verify', verifyEmail);
router.post('/login', login);




export default router;

import { selectWorkspaceController } from "../controllers/auth/onboardingController";
import express from 'express';
import { authMiddleware } from "../middlewares/authMidlleware";
import { asyncHandler } from "../middlewares/asyncHandler";


const router = express.Router();

router.post('/workspace', authMiddleware, asyncHandler(selectWorkspaceController));



export default router;

import express from 'express';

import { authMiddleware } from '../middlewares/authMidlleware';
import { asyncHandler } from '../middlewares/asyncHandler';
import { getMe } from '../controllers/user/getMeController';
import { updateUserInformationsController } from '../controllers/user/updateUserInfosController';

const router = express.Router();

router.get('/getMe', authMiddleware, asyncHandler(getMe));
router.put(
    "/update-user",
    authMiddleware,
    updateUserInformationsController
)


export default router;

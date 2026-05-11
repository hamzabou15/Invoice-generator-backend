import express from 'express';

import { authMiddleware } from '../middlewares/authMidlleware';
import { asyncHandler } from '../middlewares/asyncHandler';
import { verifySiretController } from '../controllers/organization/verifySiretController';


const router = express.Router();

// on verifie le SIRET depuis l'api du gouvernement
router.get('/verify-siret/:siret', authMiddleware, asyncHandler(verifySiretController));

export default router;


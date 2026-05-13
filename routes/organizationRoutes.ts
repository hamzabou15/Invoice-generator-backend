import express from 'express';

import { authMiddleware } from '../middlewares/authMidlleware';
import { asyncHandler } from '../middlewares/asyncHandler';
import { getOrganizationController, updateOrganizationController, verifySiretController } from '../controllers/organization/organization.contoller';
import { getBankingController, updateBankingController } from '../controllers/organization/organizationBanking.controller';


const router = express.Router();

// on verifie le SIRET depuis l'api du gouvernement
router.get('/verify-siret/:siret', authMiddleware, asyncHandler(verifySiretController));
router.put('/', authMiddleware, asyncHandler(updateOrganizationController));
router.get('/', authMiddleware, asyncHandler(getOrganizationController));
router.put('/banking', authMiddleware, asyncHandler(updateBankingController));
router.get('/banking', authMiddleware, asyncHandler(getBankingController));





export default router;


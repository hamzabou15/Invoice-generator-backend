"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMidlleware_1 = require("../middlewares/authMidlleware");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const organization_contoller_1 = require("../controllers/organization/organization.contoller");
const organizationBanking_controller_1 = require("../controllers/organization/organizationBanking.controller");
const router = express_1.default.Router();
// on verifie le SIRET depuis l'api du gouvernement
router.get('/verify-siret/:siret', authMidlleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(organization_contoller_1.verifySiretController));
router.put('/', authMidlleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(organization_contoller_1.updateOrganizationController));
router.get('/', authMidlleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(organization_contoller_1.getOrganizationController));
router.put('/banking', authMidlleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(organizationBanking_controller_1.updateBankingController));
router.get('/banking', authMidlleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(organizationBanking_controller_1.getBankingController));
exports.default = router;

"use strict";
// backend/controllers/organization/banking.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBankingController = getBankingController;
exports.updateBankingController = updateBankingController;
const organizationBanking_service_1 = require("../../services/organizations/organizationBanking.service");
/* =========================================================
   GET BANKING
========================================================= */
async function getBankingController(req, res, next) {
    try {
        const organizationId = req.user.id;
        const banking = await (0, organizationBanking_service_1.getBankingByOrganization)(organizationId);
        return res.status(200).json({
            success: true,
            data: banking,
        });
    }
    catch (error) {
        next(error);
    }
}
/* =========================================================
   UPDATE BANKING
========================================================= */
async function updateBankingController(req, res, next) {
    try {
        const organizationId = req.user.id;
        const banking = await (0, organizationBanking_service_1.upsertBanking)(organizationId, req.body);
        return res.status(200).json({
            success: true,
            message: "Coordonnées bancaires mises à jour.",
            data: banking,
        });
    }
    catch (error) {
        next(error);
    }
}

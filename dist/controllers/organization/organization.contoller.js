"use strict";
// backend/controllers/organization/getOrganization.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySiretController = void 0;
exports.getOrganizationController = getOrganizationController;
exports.updateOrganizationController = updateOrganizationController;
const organization_service_1 = require("../../services/organizations/organization.service");
/* =========================================================
   GET ORGANIZATION
========================================================= */
async function getOrganizationController(req, res) {
    try {
        const organization = await (0, organization_service_1.getOrganizationService)(req.user.id);
        return res.status(200).json({
            success: true,
            data: organization,
        });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}
/* =========================================================
   UPDATE ORGANIZATION
========================================================= */
async function updateOrganizationController(req, res) {
    try {
        const organization = await (0, organization_service_1.updateOrganizationService)({
            userId: req.user.id,
            data: req.body,
        });
        return res.status(200).json({
            success: true,
            message: "Organisation mise à jour",
            data: organization,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
/* =========================================================
   VERIFY SIRET
========================================================= */
const verifySiretController = async (req, res) => {
    try {
        const { siret } = req.params;
        if (!siret) {
            return res.status(400).json({
                message: "SIRET manquant",
            });
        }
        const company = await (0, organization_service_1.verifySiretService)(siret);
        return res.status(200).json(company);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message ||
                "Erreur serveur",
        });
    }
};
exports.verifySiretController = verifySiretController;

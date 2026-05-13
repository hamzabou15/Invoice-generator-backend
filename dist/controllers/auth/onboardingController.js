"use strict";
// controllers/onboardingController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectWorkspaceController = void 0;
const onboardingService_1 = require("../../services/auth/onboardingService");
const onboardingSchema_1 = require("../../validators/auth/onboardingSchema");
const selectWorkspaceController = async (req, res) => {
    try {
        /* ========= AUTH USER ======== */
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "Non autorisé",
            });
        }
        /* ======== VALIDATION ========== */
        const validatedData = onboardingSchema_1.workspaceSchema.parse(req.body);
        /* ======== SERVICE ========= */
        const result = await (0, onboardingService_1.createWorkspaceService)({
            userId,
            workspaceType: validatedData.workspaceType,
        });
        /* ======= RESPONSE ========= */
        return res.status(201).json({
            message: "Workspace créé avec succès",
            data: result,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.selectWorkspaceController = selectWorkspaceController;

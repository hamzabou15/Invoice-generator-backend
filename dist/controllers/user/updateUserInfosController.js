"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserInformationsController = void 0;
const zod_1 = require("zod");
const updateUserInfosService_1 = require("../../services/user/updateUserInfosService");
const updateUserInfosSchema_1 = require("../../validators/user/updateUserInfosSchema");
// update user informations 
const updateUserInformationsController = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "Non autorisé",
            });
        }
        const validatedData = updateUserInfosSchema_1.updateUserSchema.parse(req.body);
        const updatedUser = await (0, updateUserInfosService_1.updateUserInformationsService)({
            userId,
            ...validatedData,
        });
        return res.status(200).json({
            message: "Profil mis à jour",
            user: updatedUser,
        });
    }
    catch (error) {
        console.log("Erreur update user:", error);
        // ZOD VALIDATION
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: error,
            });
        }
        // CUSTOM ERRORS
        return res.status(400).json({
            message: error.message ||
                "Erreur serveur",
        });
    }
};
exports.updateUserInformationsController = updateUserInformationsController;

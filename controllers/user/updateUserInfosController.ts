import { Request, Response } from "express";
import { ZodError } from "zod";
import { updateUserInformationsService } from "../../services/user/updateUserInfosService";
import { updateUserSchema } from "../../validators/user/updateUserInfosSchema";


// update user informations 
export const updateUserInformationsController =
    async (
        req: any,
        res: Response
    ) => {

        try {

            const userId = req.user?.id;

            if (!userId) {

                return res.status(401).json({
                    message: "Non autorisé",
                });
            }

            const validatedData =
                updateUserSchema.parse(
                    req.body
                );

            const updatedUser =
                await updateUserInformationsService({
                    userId,
                    ...validatedData,
                });

            return res.status(200).json({
                message: "Profil mis à jour",
                user: updatedUser,
            });

        } catch (error: any) {

            console.log(
                "Erreur update user:",
                error
            );

            // ZOD VALIDATION
            if (error instanceof ZodError) {

                return res.status(400).json({
                    message: error,
                });
            }

            // CUSTOM ERRORS
            return res.status(400).json({
                message:
                    error.message ||
                    "Erreur serveur",
            });
        }
    };
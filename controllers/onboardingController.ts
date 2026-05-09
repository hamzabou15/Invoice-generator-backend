// controllers/onboardingController.ts

import { Response } from "express";
import { workspaceSchema } from "../validators/onboarding";
import { createWorkspaceService } from "./onboardingService";



export const selectWorkspaceController =
    async (
        req: any,
        res: Response
    ) => {
        try {

            /* ========= AUTH USER ======== */

            const userId =
                req.user?.id;

            if (!userId) {
                return res.status(401).json({
                    message:
                        "Non autorisé",
                });
            }

            /* ======== VALIDATION ========== */

            const validatedData =
                workspaceSchema.parse(
                    req.body
                );

            /* ======== SERVICE ========= */

            const result =
                await createWorkspaceService({
                    userId,

                    workspaceType:
                        validatedData.workspaceType,
                });

            /* ======= RESPONSE ========= */

            return res.status(201).json({
                message:
                    "Workspace créé avec succès",

                data: result,
            });

        } catch (error: any) {

            return res.status(400).json({
                message: error.message,
            });
        }
    };
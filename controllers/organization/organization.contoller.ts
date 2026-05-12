
// backend/controllers/organization/getOrganization.controller.ts

import { Request, Response }
    from "express";

import {
    getOrganizationService,
    updateOrganizationService,
    verifySiretService,
} from "../../services/organizations/organization.service";

/* =========================================================
   GET ORGANIZATION
========================================================= */

export async function getOrganizationController(
    req: Request,
    res: Response
) {

    try {

        const organization =
            await getOrganizationService(
                req.user.id
            );

        return res.status(200).json({

            success: true,

            data: organization,
        });

    } catch (error: any) {

        return res.status(404).json({

            success: false,

            message:
                error.message,
        });
    }
}

/* =========================================================
   UPDATE ORGANIZATION
========================================================= */

export async function updateOrganizationController(
    req: Request,
    res: Response
) {

    try {

        const organization =
            await updateOrganizationService({

                userId:
                    req.user.id,

                data:
                    req.body,
            });

        return res.status(200).json({

            success: true,

            message:
                "Organisation mise à jour",

            data: organization,
        });

    } catch (error: any) {

        return res.status(400).json({

            success: false,

            message:
                error.message,
        });
    }
}

/* =========================================================
   VERIFY SIRET
========================================================= */


export const verifySiretController =
    async (
        req: Request,
        res: Response
    ) => {
        try {

            const { siret } = req.params;

            if (!siret) {
                return res.status(400).json({
                    message: "SIRET manquant",
                });
            }

            const company =
                await verifySiretService(siret);

            return res.status(200).json(company);

        } catch (error: any) {

            return res.status(400).json({
                message:
                    error.message ||
                    "Erreur serveur",
            });
        }
    };
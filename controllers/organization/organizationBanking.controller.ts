// backend/controllers/organization/banking.controller.ts

import type {
    Request,
    Response,
    NextFunction,
} from "express";
import { getBankingByOrganization, upsertBanking } from "../../services/organizations/organizationBanking.service";


/* =========================================================
   GET BANKING
========================================================= */

export async function getBankingController(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const organizationId =
            req.user.id as string;

        const banking =
            await getBankingByOrganization(
                organizationId
            );

        return res.status(200).json({

            success: true,

            data: banking,
        });

    } catch (error) {

        next(error);
    }
}

/* =========================================================
   UPDATE BANKING
========================================================= */

export async function updateBankingController(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const organizationId =
            req.user.id;

        const banking =
            await upsertBanking(
                organizationId,
                req.body
            );

        return res.status(200).json({

            success: true,

            message:
                "Coordonnées bancaires mises à jour.",

            data: banking,
        });

    } catch (error) {

        next(error);
    }
}
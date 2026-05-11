import { Request, Response } from "express";
import { verifySiretService } from "../../services/organizations/verifySiretService";


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
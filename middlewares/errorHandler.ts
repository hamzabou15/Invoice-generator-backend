import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

// Middleware global d'erreurs
export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err); // log pour debugging côté serveur

    // Erreur de validation (Zod)
    if (err instanceof ZodError) {
        return res.status(400).json({
            type: "validation_error",
            errors: err.issues, // tableau d'issues Zod
        });
    }

    //  Erreur métier (business logic)
    if (err instanceof Error) {
        return res.status(400).json({
            type: "business_error",
            message: err.message, // message custom throw dans services
        });
    }

    //  Erreur serveur inattendue
    return res.status(500).json({
        type: "server_error",
        message: "Internal server error",
    });
};

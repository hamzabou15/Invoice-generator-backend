"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
// Middleware global d'erreurs
const errorHandler = (err, req, res, next) => {
    console.error(err); // log pour debugging côté serveur
    // Erreur de validation (Zod)
    if (err instanceof zod_1.ZodError) {
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
exports.errorHandler = errorHandler;

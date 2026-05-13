"use strict";
// Validation des données (Zod / Joi)
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessSchema = void 0;
const zod_1 = require("zod");
// schema business
exports.businessSchema = zod_1.z.object({
    businessName: zod_1.z
        .string()
        .min(2, "La raison sociale doit contenir au moins 2 caractères")
        .max(100),
    brandName: zod_1.z
        .string()
        .min(2, "Le nom de marque doit contenir au moins 2 caractères")
        .max(100),
    teamSize: zod_1.z.enum(["freelance", "agency", "pme", "enterprise"]),
    profile: zod_1.z.enum(["freelance", "agency", "pme", "enterprise"]),
    website: zod_1.z
        .string()
        .url("URL invalide")
        .optional()
        .or(zod_1.z.literal("")),
    phone: zod_1.z
        .string()
        .refine((val) => val.startsWith("+"), {
        message: "Numéro international requis",
    }),
    country: zod_1.z.string().min(1, "Pays requis"),
    // currency: z.string().min(1, "Devise requise"),
    createdAt: zod_1.z.date().optional(),
});

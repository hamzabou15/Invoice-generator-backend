"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrganizationSchema = void 0;
const zod_1 = require("zod");
exports.updateOrganizationSchema = zod_1.z.object({
    businessName: zod_1.z.string()
        .min(1, "La raison sociale est obligatoire")
        .max(120),
    siret: zod_1.z.string()
        .min(1, "Le SIRET est obligatoire")
        .regex(/^[0-9]{14}$/, "SIRET invalide"),
    siren: zod_1.z.string()
        .regex(/^[0-9]{9}$/, "SIREN invalide")
        .optional()
        .or(zod_1.z.literal("")),
    vatNumber: zod_1.z.string()
        .optional()
        .or(zod_1.z.literal("")),
    apeCode: zod_1.z.string()
        .optional()
        .or(zod_1.z.literal("")),
    phone: zod_1.z.string()
        .min(8, "Téléphone invalide")
        .max(20)
        .optional()
        .or(zod_1.z.literal("")),
    email: zod_1.z.string()
        .email("Email invalide")
        .optional()
        .or(zod_1.z.literal("")),
    website: zod_1.z.string()
        .url("URL invalide")
        .optional()
        .or(zod_1.z.literal("")),
    address: zod_1.z.string()
        .min(3, "Adresse invalide")
        .max(255)
        .optional()
        .or(zod_1.z.literal("")),
    city: zod_1.z.string()
        .max(120)
        .optional()
        .or(zod_1.z.literal("")),
    postalCode: zod_1.z.string()
        .max(20)
        .optional()
        .or(zod_1.z.literal("")),
    country: zod_1.z.string()
        .max(80)
        .optional(),
    currency: zod_1.z.string()
        .max(10)
        .optional(),
    timezone: zod_1.z.string()
        .max(80)
        .optional(),
    locale: zod_1.z.string()
        .max(10)
        .optional(),
});

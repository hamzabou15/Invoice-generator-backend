// Validation des données (Zod / Joi)

import { z } from 'zod';



// schema business
export const businessSchema = z.object({
    businessName: z
        .string()
        .min(2, "La raison sociale doit contenir au moins 2 caractères")
        .max(100),

    brandName: z
        .string()
        .min(2, "Le nom de marque doit contenir au moins 2 caractères")
        .max(100),

    teamSize: z.enum(["freelance", "agency", "pme", "enterprise"]),

    profile: z.enum(["freelance", "agency", "pme", "enterprise"]),

    website: z
        .string()
        .url("URL invalide")
        .optional()
        .or(z.literal("")),

    phone: z
        .string()
        .refine((val) => val.startsWith("+"), {
            message: "Numéro international requis",
        }),

    country: z.string().min(1, "Pays requis"),
    // currency: z.string().min(1, "Devise requise"),
    createdAt: z.date().optional(),
});


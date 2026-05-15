import { z } from "zod";

export const updateOrganizationSchema =
    z.object({

        businessName:
            z.string()
                .min(1, "La raison sociale est obligatoire")
                .max(120),

        siret:
            z.string()
                .min(1, "Le SIRET est obligatoire")
                .regex(
                    /^[0-9]{14}$/,
                    "SIRET invalide"
                ),

        siren:
            z.string()
                .regex(
                    /^[0-9]{9}$/,
                    "SIREN invalide"
                )
                .optional()
                .or(z.literal("")),

        vatNumber:
            z.string()
                .optional()
                .or(z.literal("")),

        apeCode:
            z.string()
                .optional()
                .or(z.literal("")),

        phone:
            z.string()
                .min(8, "Téléphone invalide")
                .max(20)
                .optional()
                .or(z.literal("")),

        email:
            z.string()
                .email("Email invalide")
                .optional()
                .or(z.literal("")),

        website:
            z.string()
                .url("URL invalide")
                .optional()
                .or(z.literal("")),

        address:
            z.string()
                .min(3, "Adresse invalide")
                .max(255)
                .optional()
                .or(z.literal("")),

        city:
            z.string()
                .max(120)
                .optional()
                .or(z.literal("")),

        postalCode:
            z.string()
                .max(20)
                .optional()
                .or(z.literal("")),

        country:
            z.string()
                .max(80)
                .optional(),

        currency:
            z.string()
                .max(10)
                .optional(),

        timezone:
            z.string()
                .max(80)
                .optional(),

        locale:
            z.string()
                .max(10)
                .optional(),
        logo: z.string().optional(),
    });
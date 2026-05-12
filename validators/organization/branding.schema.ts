// validators/organization/organizationBranding.schema.ts

import { z } from "zod";

/* =========================================================
   BRANDING
========================================================= */

export const updateOrganizationBrandingSchema =
    z.object({

        logo:
            z.string()
                .url("Logo invalide")
                .optional()
                .or(z.literal("")),

        primaryColor:
            z.string()
                .regex(
                    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
                    "Couleur invalide"
                )
                .optional(),

        secondaryColor:
            z.string()
                .regex(
                    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
                    "Couleur invalide"
                )
                .optional(),

        accentColor:
            z.string()
                .regex(
                    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
                    "Couleur invalide"
                )
                .optional(),

        fontFamily:
            z.string()
                .max(80)
                .optional(),

        darkMode:
            z.boolean()
                .optional(),
    });
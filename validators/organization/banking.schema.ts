// validators/organization/organizationBanking.schema.ts

import { z } from "zod";

/* =========================================================
   BANKING
========================================================= */

export const updateOrganizationBankingSchema =
    z.object({

        iban:
            z.string()
                .min(10,
                    "IBAN invalide")
                .max(40)
                .optional()
                .or(z.literal("")),

        bic:
            z.string()
                .min(8)
                .max(11)
                .optional()
                .or(z.literal("")),

        bankName:
            z.string()
                .max(120)
                .optional()
                .or(z.literal("")),

        accountHolder:
            z.string()
                .max(120)
                .optional()
                .or(z.literal("")),

        stripeEnabled:
            z.boolean()
                .optional(),

        paypalEmail:
            z.string()
                .email("Email Paypal invalide")
                .optional()
                .or(z.literal("")),
    });
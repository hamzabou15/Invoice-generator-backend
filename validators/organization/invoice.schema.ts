// validators/organization/organizationInvoiceSettings.schema.ts

import { z } from "zod";

/* =========================================================
   INVOICE SETTINGS
========================================================= */

export const updateOrganizationInvoiceSettingsSchema =
    z.object({

        invoicePrefix:
            z.string()
                .min(1, "Préfixe obligatoire")
                .max(10),

        invoiceStartNumber:
            z.number()
                .min(1)
                .optional(),

        quotePrefix:
            z.string()
                .max(10)
                .optional()
                .or(z.literal("")),

        paymentTerms:
            z.number()
                .min(0)
                .max(120)
                .optional(),

        lateFeePercentage:
            z.number()
                .min(0)
                .max(100)
                .optional(),

        footerNote:
            z.string()
                .max(1000)
                .optional()
                .or(z.literal("")),

        showBankDetails:
            z.boolean()
                .optional(),

        showLogo:
            z.boolean()
                .optional(),
    });
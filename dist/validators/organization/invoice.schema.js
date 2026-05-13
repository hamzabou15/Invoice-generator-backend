"use strict";
// validators/organization/organizationInvoiceSettings.schema.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrganizationInvoiceSettingsSchema = void 0;
const zod_1 = require("zod");
/* =========================================================
   INVOICE SETTINGS
========================================================= */
exports.updateOrganizationInvoiceSettingsSchema = zod_1.z.object({
    invoicePrefix: zod_1.z.string()
        .min(1, "Préfixe obligatoire")
        .max(10),
    invoiceStartNumber: zod_1.z.number()
        .min(1)
        .optional(),
    quotePrefix: zod_1.z.string()
        .max(10)
        .optional()
        .or(zod_1.z.literal("")),
    paymentTerms: zod_1.z.number()
        .min(0)
        .max(120)
        .optional(),
    lateFeePercentage: zod_1.z.number()
        .min(0)
        .max(100)
        .optional(),
    footerNote: zod_1.z.string()
        .max(1000)
        .optional()
        .or(zod_1.z.literal("")),
    showBankDetails: zod_1.z.boolean()
        .optional(),
    showLogo: zod_1.z.boolean()
        .optional(),
});

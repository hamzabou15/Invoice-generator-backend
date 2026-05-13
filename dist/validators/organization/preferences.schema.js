"use strict";
// validators/organization/organizationPreferences.schema.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrganizationPreferencesSchema = void 0;
const zod_1 = require("zod");
/* =========================================================
   PREFERENCES
========================================================= */
exports.updateOrganizationPreferencesSchema = zod_1.z.object({
    language: zod_1.z.enum([
        "fr",
        "en",
    ])
        .optional(),
    timezone: zod_1.z.string()
        .max(80)
        .optional(),
    currency: zod_1.z.string()
        .max(10)
        .optional(),
    notificationsEmail: zod_1.z.boolean()
        .optional(),
    notificationsSms: zod_1.z.boolean()
        .optional(),
    autoReminders: zod_1.z.boolean()
        .optional(),
    defaultPaymentMethod: zod_1.z.enum([
        "bank_transfer",
        "card",
        "cash",
        "check",
    ])
        .optional(),
});

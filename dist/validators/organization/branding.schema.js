"use strict";
// validators/organization/organizationBranding.schema.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrganizationBrandingSchema = void 0;
const zod_1 = require("zod");
/* =========================================================
   BRANDING
========================================================= */
exports.updateOrganizationBrandingSchema = zod_1.z.object({
    logo: zod_1.z.string()
        .url("Logo invalide")
        .optional()
        .or(zod_1.z.literal("")),
    primaryColor: zod_1.z.string()
        .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Couleur invalide")
        .optional(),
    secondaryColor: zod_1.z.string()
        .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Couleur invalide")
        .optional(),
    accentColor: zod_1.z.string()
        .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Couleur invalide")
        .optional(),
    fontFamily: zod_1.z.string()
        .max(80)
        .optional(),
    darkMode: zod_1.z.boolean()
        .optional(),
});

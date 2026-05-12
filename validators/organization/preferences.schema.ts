// validators/organization/organizationPreferences.schema.ts

import { z } from "zod";

/* =========================================================
   PREFERENCES
========================================================= */

export const updateOrganizationPreferencesSchema =
  z.object({

    language:
      z.enum([
        "fr",
        "en",
      ])
        .optional(),

    timezone:
      z.string()
        .max(80)
        .optional(),

    currency:
      z.string()
        .max(10)
        .optional(),

    notificationsEmail:
      z.boolean()
        .optional(),

    notificationsSms:
      z.boolean()
        .optional(),

    autoReminders:
      z.boolean()
        .optional(),

    defaultPaymentMethod:
      z.enum([
        "bank_transfer",
        "card",
        "cash",
        "check",
      ])
        .optional(),
  });
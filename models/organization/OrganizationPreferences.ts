// models/OrganizationPreferences.ts

import mongoose, {
  Document,
  Types,
} from "mongoose";

export interface IOrganizationPreferences
  extends Document {
  organization: Types.ObjectId;

  timezone?: string;

  language?: string;

  dateFormat?: string;

  currencyFormat?: string;

  notifications: {
    email: boolean;

    invoicePaid: boolean;

    quoteAccepted: boolean;
  };

  createdAt: Date;
  updatedAt: Date;
}

const organizationPreferencesSchema =
  new mongoose.Schema<IOrganizationPreferences>(
    {
      organization: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
        unique: true,
      },

      timezone: {
        type: String,
        default: "Europe/Paris",
      },

      language: {
        type: String,
        default: "fr",
      },

      dateFormat: {
        type: String,
        default: "DD/MM/YYYY",
      },

      currencyFormat: {
        type: String,
        default: "EUR",
      },

      notifications: {
        email: {
          type: Boolean,
          default: true,
        },

        invoicePaid: {
          type: Boolean,
          default: true,
        },

        quoteAccepted: {
          type: Boolean,
          default: true,
        },
      },
    },
    {
      timestamps: true,
    }
  );

organizationPreferencesSchema.index({
  organization: 1,
});

const OrganizationPreferences =
  mongoose.model<IOrganizationPreferences>(
    "OrganizationPreferences",
    organizationPreferencesSchema
  );

export default OrganizationPreferences;
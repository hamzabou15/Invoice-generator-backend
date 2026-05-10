// models/OrganizationInvoiceSettings.ts

import mongoose, {
  Document,
  Types,
} from "mongoose";

export interface IOrganizationInvoiceSettings
  extends Document {
  organization: Types.ObjectId;

  invoicePrefix?: string;

  quotePrefix?: string;

  invoiceCounter: number;

  quoteCounter: number;

  vatEnabled: boolean;

  defaultVatRate?: number;

  paymentTerms?: number;

  lateFees?: string;

  footerText?: string;

  createdAt: Date;
  updatedAt: Date;
}

const organizationInvoiceSettingsSchema =
  new mongoose.Schema<IOrganizationInvoiceSettings>(
    {
      organization: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
        unique: true,
      },

      invoicePrefix: {
        type: String,
        default: "FAC",
      },

      quotePrefix: {
        type: String,
        default: "DEV",
      },

      invoiceCounter: {
        type: Number,
        default: 1,
      },

      quoteCounter: {
        type: Number,
        default: 1,
      },

      vatEnabled: {
        type: Boolean,
        default: true,
      },

      defaultVatRate: {
        type: Number,
        default: 20,
      },

      paymentTerms: {
        type: Number,
        default: 30,
      },

      lateFees: {
        type: String,
      },

      footerText: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

organizationInvoiceSettingsSchema.index(
  {
    organization: 1,
  }
);

const OrganizationInvoiceSettings =
  mongoose.model<IOrganizationInvoiceSettings>(
    "OrganizationInvoiceSettings",
    organizationInvoiceSettingsSchema
  );

export default OrganizationInvoiceSettings;
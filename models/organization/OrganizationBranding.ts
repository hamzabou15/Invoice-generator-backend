// models/OrganizationBranding.ts

import mongoose, {
  Document,
  Types,
} from "mongoose";

export interface IOrganizationBranding
  extends Document {
  organization: Types.ObjectId;

  primaryColor?: string;

  secondaryColor?: string;

  logo?: string;

  emailHeader?: string;

  pdfTemplate?: string;

  font?: string;

  createdAt: Date;
  updatedAt: Date;
}

const organizationBrandingSchema =
  new mongoose.Schema<IOrganizationBranding>(
    {
      organization: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
        unique: true,
      },

      primaryColor: {
        type: String,
        default: "#2D6A4F",
      },

      secondaryColor: {
        type: String,
        default: "#111827",
      },

      logo: {
        type: String,
      },

      emailHeader: {
        type: String,
      },

      pdfTemplate: {
        type: String,
      },

      font: {
        type: String,
        default: "Inter",
      },
    },
    {
      timestamps: true,
    }
  );

organizationBrandingSchema.index({
  organization: 1,
});

const OrganizationBranding =
  mongoose.model<IOrganizationBranding>(
    "OrganizationBranding",
    organizationBrandingSchema
  );

export default OrganizationBranding;
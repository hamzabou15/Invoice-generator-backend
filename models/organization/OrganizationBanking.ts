// backend/models/organization/OrganizationBanking.ts

import mongoose, {
  Document,
  Types,
} from "mongoose";

/* =========================================================
   TYPES
========================================================= */

export type PaymentMethod =
  | "bank_transfer"
  | "card"
  | "cash"
  | "check";

export interface IOrganizationBanking
  extends Document {

  /* ========= RELATION ========= */

  organization: Types.ObjectId;

  /* ========= BANK ========= */

  ibanEncrypted?: string;

  ibanLast4?: string;

  bic?: string;

  bankName?: string;

  accountHolder?: string;

  /* ========= PAYMENT METHODS ========= */

  paymentMethods: PaymentMethod[];

  /* ========= SECURITY ========= */

  verified: boolean;

  verifiedAt?: Date;

  /* ========= FLAGS ========= */

  isActive: boolean;

  /* ========= DATES ========= */

  createdAt: Date;

  updatedAt: Date;
}

/* =========================================================
   SCHEMA
========================================================= */

const organizationBankingSchema =
  new mongoose.Schema<IOrganizationBanking>(
    {

      /* ========= RELATION ========= */

      organization: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Organization",

        required: true,

        unique: true,

        index: true,
      },

      /* ========= BANK ========= */

      ibanEncrypted: {
        type: String,

        trim: true,

        default: "",
      },

      ibanLast4: {
        type: String,

        trim: true,

        maxlength: 4,

        default: "",
      },

      bic: {
        type: String,

        uppercase: true,

        trim: true,

        maxlength: 11,

        default: "",
      },

      bankName: {
        type: String,

        trim: true,

        maxlength: 120,

        default: "",
      },

      accountHolder: {
        type: String,

        trim: true,

        maxlength: 120,

        default: "",
      },

      /* ========= PAYMENT METHODS ========= */

      paymentMethods: [
        {
          type: String,

          enum: [
            "bank_transfer",
            "card",
            "cash",
            "check",
          ],
        },
      ],

      /* ========= SECURITY ========= */

      verified: {
        type: Boolean,

        default: false,
      },

      verifiedAt: {
        type: Date,
      },

      /* ========= FLAGS ========= */

      isActive: {
        type: Boolean,

        default: true,
      },
    },

    {
      timestamps: true,
    }
  );

/* =========================================================
   INDEXES
========================================================= */

organizationBankingSchema.index({
  organization: 1,
});

/* =========================================================
   MODEL
========================================================= */

const OrganizationBanking =
  mongoose.model<IOrganizationBanking>(
    "OrganizationBanking",
    organizationBankingSchema
  );

export default OrganizationBanking;
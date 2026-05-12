// backend/models/organization/Organization.ts
import NextFunction from "express";
import mongoose, {
  Document,
  Types,
} from "mongoose";

import slugify from "slugify";

export interface IOrganization
  extends Document {

  /* ========= OWNER ========= */

  owner: Types.ObjectId;

  /* ========= COMPANY ========= */

  businessName: string;

  slug: string;

  brandName?: string;

  logo?: string;

  website?: string;

  email?: string;

  phone?: string;

  professionalPhone?: string;

  /* ========= LEGAL ========= */

  siret?: string;

  siren?: string;

  legalStatus?: string;

  vatNumber?: string;

  apeCode?: string;

  capital?: string;

  rcs?: string;

  /* ========= ADDRESS ========= */

  address?: string;

  city?: string;

  postalCode?: string;

  country: string;

  /* ========= SETTINGS ========= */

  currency: string;

  timezone: string;

  locale: string;

  /* ========= WORKSPACE ========= */

  workspaceType:
  | "solo"
  | "team";

  teamSize?:
  | "freelance"
  | "small_team"
  | "pme"
  | "enterprise";

  profile?:
  | "artisan"
  | "electrician"
  | "plumber"
  | "painter"
  | "roofer"
  | "mason"
  | "multi_services";

  /* ========= SUBSCRIPTION ========= */

  subscriptionPlan:
  | "free"
  | "solo"
  | "solo_pro"
  | "team";

  subscriptionStatus:
  | "trial"
  | "active"
  | "past_due"
  | "canceled";

  stripeCustomerId?: string;

  stripeSubscriptionId?: string;

  trialEndsAt?: Date;

  /* ========= FLAGS ========= */

  onboardingCompleted: boolean;

  isActive: boolean;

  archivedAt?: Date;

  /* ========= DATES ========= */

  createdAt: Date;

  updatedAt: Date;
}

const organizationSchema =
  new mongoose.Schema<IOrganization>(
    {

      /* ========= OWNER ========= */

      owner: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        index: true,
      },

      /* ========= COMPANY ========= */

      businessName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
      },

      slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      brandName: {
        type: String,
        trim: true,
        default: "",
      },

      logo: {
        type: String,
        default: "",
      },

      website: {
        type: String,
        trim: true,
        default: "",
      },

      email: {
        type: String,
        trim: true,
        lowercase: true,
        default: "",
      },

      phone: {
        type: String,
        trim: true,
        default: "",
      },

      professionalPhone: {
        type: String,
        trim: true,
        default: "",
      },

      /* ========= LEGAL ========= */

      siret: {
        type: String,
        trim: true,
        default: "",
      },

      siren: {
        type: String,
        trim: true,
        default: "",
      },

      legalStatus: {
        type: String,
        trim: true,
        default: "",
      },

      vatNumber: {
        type: String,
        trim: true,
        default: "",
      },

      apeCode: {
        type: String,
        trim: true,
        default: "",
      },

      capital: {
        type: String,
        trim: true,
        default: "",
      },

      rcs: {
        type: String,
        trim: true,
        default: "",
      },

      /* ========= ADDRESS ========= */

      address: {
        type: String,
        trim: true,
        default: "",
      },

      city: {
        type: String,
        trim: true,
        default: "",
      },

      postalCode: {
        type: String,
        trim: true,
        default: "",
      },

      country: {
        type: String,
        default: "FR",
      },

      /* ========= LOCALIZATION ========= */

      currency: {
        type: String,
        default: "EUR",
      },

      timezone: {
        type: String,
        default: "Europe/Paris",
      },

      locale: {
        type: String,
        default: "fr",
      },

      /* ========= WORKSPACE ========= */

      workspaceType: {
        type: String,

        enum: [
          "solo",
          "team",
        ],

        required: true,
      },

      teamSize: {
        type: String,

        enum: [
          "freelance",
          "small_team",
          "pme",
          "enterprise",
        ],
      },

      profile: {
        type: String,

        enum: [
          "artisan",
          "electrician",
          "plumber",
          "painter",
          "roofer",
          "mason",
          "multi_services",
        ],

        default: "artisan",
      },

      /* ========= BILLING ========= */

      subscriptionPlan: {
        type: String,

        enum: [
          "free",
          "solo",
          "solo_pro",
          "team",
        ],

        default: "free",
      },

      subscriptionStatus: {
        type: String,

        enum: [
          "trial",
          "active",
          "past_due",
          "canceled",
        ],

        default: "trial",
      },

      stripeCustomerId: {
        type: String,
        index: true,
      },

      stripeSubscriptionId: {
        type: String,
      },

      trialEndsAt: {
        type: Date,
      },

      /* ========= FLAGS ========= */

      onboardingCompleted: {
        type: Boolean,
        default: false,
      },

      isActive: {
        type: Boolean,
        default: true,
      },

      archivedAt: {
        type: Date,
      },
    },

    {
      timestamps: true,
    }
  );

/* ========= INDEXES ========= */

organizationSchema.index({
  owner: 1,
});

organizationSchema.index({
  slug: 1,
});

organizationSchema.index({
  workspaceType: 1,
  subscriptionPlan: 1,
});

/* ========= AUTO SLUG ========= */

organizationSchema.pre(
  "validate",
  function () {

    if (
      this.isNew &&
      !this.slug &&
      this.businessName
    ) {

      this.slug =
        slugify(
          this.businessName,
          {
            lower: true,
            strict: true,
          }
        );
    }

  }
);

/* ========= MODEL ========= */

const Organization =
  mongoose.model<IOrganization>(
    "Organization",
    organizationSchema
  );

export default Organization;
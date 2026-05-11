import mongoose, {
  Document,
  Types,
} from "mongoose";
import slugify from "slugify";
import NextFunction from "express";

export interface IOrganization
  extends Document {
  /* ========= CORE ========= */

  owner: Types.ObjectId;

  /* ========= BASIC ========= */

  businessName: string;

  slug: string;

  brandName?: string;

  logo?: string;

  website?: string;

  phone?: string;

  email?: string;

  country: string;

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

  /* ========= METADATA ========= */

  createdAt: Date;
  updatedAt: Date;
}

const organizationSchema =
  new mongoose.Schema<IOrganization>(
    {
      /* ========= OWNER ========= */

      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      /* ========= BASIC ========= */

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
        maxlength: 120,
      },

      logo: {
        type: String,
      },

      website: {
        type: String,
        trim: true,
      },

      phone: {
        type: String,
        trim: true,
      },

      email: {
        type: String,
        trim: true,
        lowercase: true,
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


organizationSchema.pre(
  "validate",
  function () {

    if (
      this.isNew &&
      !this.slug &&
      this.businessName
    ) {

      this.slug = slugify(
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
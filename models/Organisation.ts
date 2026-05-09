import mongoose, { Document, Types } from "mongoose";

export interface IOrganization extends Document {
    // Owner principal
    owner: Types.ObjectId;

    /* ======== INFORMATIONS ENTREPRISE ============ */

    businessName: string;

    brandName?: string;

    website?: string;

    logo?: string;

    phone?: string;

    country: string;

    currency: string;

    /* ======== WORKSPACE ========== */

    // Structure de travail
    workspaceType:
    | "solo"
    | "team";

    // Taille entreprise
    teamSize?:
    | "freelance"
    | "small_team"
    | "pme"
    | "enterprise";

    // Type activité
    profile?:
    | "artisan"
    | "electrician"
    | "plumber"
    | "painter"
    | "roofer"
    | "mason"
    | "multi_services";

    /* ========= BILLING / SUBSCRIPTION ============ */

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

    /* ======== ONBOARDING =========== */

    onboardingCompleted: boolean;

    /* ======== METADATA ========= */

    createdAt: Date;
    updatedAt: Date;
}

const organizationSchema =
    new mongoose.Schema<IOrganization>(
        {
            /* ======= OWNER ========= */

            owner: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },

            /* ========  BUSINESS INFORMATIONS ========== */

            businessName: {
                type: String,
                required: true,
                trim: true,
                maxlength: 120,
            },

            brandName: {
                type: String,
                trim: true,
                maxlength: 120,
            },

            website: {
                type: String,
                trim: true,
            },

            logo: {
                type: String,
            },

            phone: {
                type: String,
                trim: true,
            },

            country: {
                type: String,
                default: "FR",
            },

            currency: {
                type: String,
                default: "EUR",
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

            /* ======== BILLING ========= */

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
            },

            stripeSubscriptionId: {
                type: String,
            },

            trialEndsAt: {
                type: Date,
            },

            /* ======== ONBOARDING ========= */

            onboardingCompleted: {
                type: Boolean,
                default: false,
            },
        },
        {
            timestamps: true,
        }
    );

/* ===== INDEXES ===== */

// multi-tenant
organizationSchema.index({
    owner: 1,
});

// stripe
organizationSchema.index({
    stripeCustomerId: 1,
});

// onboarding / analytics
organizationSchema.index({
    workspaceType: 1,
    subscriptionPlan: 1,
});

/* ======= MODEL ========== */

const Organization =
    mongoose.model<IOrganization>(
        "Organization",
        organizationSchema
    );

export default Organization;
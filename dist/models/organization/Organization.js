"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const organizationSchema = new mongoose_1.default.Schema({
    /* ========= OWNER ========= */
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
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
organizationSchema.pre("validate", function () {
    if (this.isNew &&
        !this.slug &&
        this.businessName) {
        this.slug =
            (0, slugify_1.default)(this.businessName, {
                lower: true,
                strict: true,
            });
    }
});
/* ========= MODEL ========= */
const Organization = mongoose_1.default.model("Organization", organizationSchema);
exports.default = Organization;

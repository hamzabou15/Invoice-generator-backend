import mongoose, { Document, Types } from "mongoose";

/* =========================
   DTO (API INPUT)
========================= */
export interface CreateBusinessDTO {
    user: string;
    businessName: string;
    brandName?: string;
    teamSize: "freelance" | "agency" | "pme" | "enterprise";
    profile: "freelance" | "agency" | "pme" | "enterprise";
    website?: string;
    phone: string;
    country: string;
    currency: string;
}

/* =========================
   MONGOOSE DOCUMENT (DB)
========================= */
export interface IBusiness extends Document {
    user: Types.ObjectId;
    businessName: string;
    brandName?: string;
    teamSize: "freelance" | "agency" | "pme" | "enterprise";
    profile: "freelance" | "agency" | "pme" | "enterprise";
    website?: string;
    phone: string;
    country: string;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
}


const businessSchema = new mongoose.Schema<IBusiness>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        businessName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        brandName: {
            type: String,
            trim: true,
            maxlength: 100,
        },

        teamSize: {
            type: String,
            enum: ["freelance", "agency", "pme", "enterprise"],
            required: true,
        },

        profile: {
            type: String,
            enum: ["freelance", "agency", "pme", "enterprise"],
            required: true,
        },
        website: {
            type: String,
            trim: true,
            lowercase: true,
        },

        phone: {
            type: String,
            required: true,
        },

        country: {
            type: String,
            required: true,
            uppercase: true,
        },

        // currency: {
        //     type: String,
        //     required: true,
        //     uppercase: true,
        // },
    },
    {
        timestamps: true,
    }
);

// 1 user = 1 business
businessSchema.index({ user: 1 }, { unique: true });

const Business = mongoose.model<IBusiness>("Business", businessSchema);

export default Business;
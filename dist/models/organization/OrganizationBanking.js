"use strict";
// backend/models/organization/OrganizationBanking.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/* =========================================================
   SCHEMA
========================================================= */
const organizationBankingSchema = new mongoose_1.default.Schema({
    /* ========= RELATION ========= */
    organization: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
/* =========================================================
   INDEXES
========================================================= */
organizationBankingSchema.index({
    organization: 1,
});
/* =========================================================
   MODEL
========================================================= */
const OrganizationBanking = mongoose_1.default.model("OrganizationBanking", organizationBankingSchema);
exports.default = OrganizationBanking;

"use strict";
// models/OrganizationPreferences.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const organizationPreferencesSchema = new mongoose_1.default.Schema({
    organization: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
organizationPreferencesSchema.index({
    organization: 1,
});
const OrganizationPreferences = mongoose_1.default.model("OrganizationPreferences", organizationPreferencesSchema);
exports.default = OrganizationPreferences;

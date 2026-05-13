"use strict";
// models/OrganizationBranding.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const organizationBrandingSchema = new mongoose_1.default.Schema({
    organization: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
organizationBrandingSchema.index({
    organization: 1,
});
const OrganizationBranding = mongoose_1.default.model("OrganizationBranding", organizationBrandingSchema);
exports.default = OrganizationBranding;

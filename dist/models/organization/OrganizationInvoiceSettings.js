"use strict";
// models/OrganizationInvoiceSettings.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const organizationInvoiceSettingsSchema = new mongoose_1.default.Schema({
    organization: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
        unique: true,
    },
    invoicePrefix: {
        type: String,
        default: "FAC",
    },
    quotePrefix: {
        type: String,
        default: "DEV",
    },
    invoiceCounter: {
        type: Number,
        default: 1,
    },
    quoteCounter: {
        type: Number,
        default: 1,
    },
    vatEnabled: {
        type: Boolean,
        default: true,
    },
    defaultVatRate: {
        type: Number,
        default: 20,
    },
    paymentTerms: {
        type: Number,
        default: 30,
    },
    lateFees: {
        type: String,
    },
    footerText: {
        type: String,
    },
}, {
    timestamps: true,
});
organizationInvoiceSettingsSchema.index({
    organization: 1,
});
const OrganizationInvoiceSettings = mongoose_1.default.model("OrganizationInvoiceSettings", organizationInvoiceSettingsSchema);
exports.default = OrganizationInvoiceSettings;

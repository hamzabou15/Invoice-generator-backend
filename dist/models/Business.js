"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const businessSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
// 1 user = 1 business
businessSchema.index({ user: 1 }, { unique: true });
const Business = mongoose_1.default.model("Business", businessSchema);
exports.default = Business;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const membershipSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    organization: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    role: {
        type: String,
        enum: [
            "owner",
            "admin",
            "member",
        ],
        default: "member",
    },
    status: {
        type: String,
        enum: [
            "active",
            "pending",
        ],
        default: "active",
    },
}, {
    timestamps: true,
});
membershipSchema.index({
    user: 1,
    organization: 1,
}, {
    unique: true,
});
const Membership = mongoose_1.default.model("Membership", membershipSchema);
exports.default = Membership;

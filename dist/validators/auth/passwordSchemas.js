"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.foergotPasswordSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// Schéma de validation pour le forgot password
exports.foergotPasswordSchema = zod_1.default.object({
    email: zod_1.default.string().email()
});
// Schéma de validation pour le reset password
exports.resetPasswordSchema = zod_1.default.object({
    newPassword: zod_1.default.string().min(10).max(100).regex(/[A-Z]/, "Must contain at least one uppercase letter").regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[0-9]/, "Must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    newPasswordConfirm: zod_1.default.string().min(10).max(100),
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const User_1 = __importDefault(require("../../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// logic metier pour l'inscription (pas de response ici, juste la logique)
const createUser = async (email, password, name) => {
    /* =========================
       NORMALIZE EMAIL
    ========================= */
    const normalizedEmail = email.toLowerCase().trim();
    /* =========================
       CHECK EXISTING USER
    ========================= */
    const existUser = await User_1.default.findOne({
        email: normalizedEmail,
    });
    if (existUser) {
        throw new Error("L'utilisateur existe déjà");
    }
    /* =========================
       HASH PASSWORD
    ========================= */
    const passwordHash = await bcrypt_1.default.hash(password, 10);
    /* =========================
       CREATE USER
    ========================= */
    const newUser = await User_1.default.create({
        email: normalizedEmail,
        passwordHash,
        name: name?.trim(),
        isVerified: false,
        hasCompletedOnboarding: false,
        onboardingStep: "organization",
        hasCreatedFirstQuote: false,
        lastLoginAt: new Date(),
    });
    return newUser;
};
exports.createUser = createUser;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const signupService_1 = require("../../services/auth/signupService");
const generateTokens_1 = require("../../utils/generateTokens");
const signupSchema_1 = require("../../validators/auth/signupSchema");
// ---------------- SIGNUP ----------------
const signup = async (req, res) => {
    try {
        // validation zod
        const parsed = signupSchema_1.signupSchema.parse(req.body);
        // création user
        const newUser = await (0, signupService_1.createUser)(parsed.email, parsed.password, parsed.name);
        // auto login après signup
        const token = (0, generateTokens_1.generateAcessToken)(newUser._id.toString());
        // cookie auth
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        return res.status(201).json({
            message: "Compte créé avec succès",
            user: {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name,
            },
            hasCompletedOnboarding: newUser.hasCompletedOnboarding,
            onboardingStep: newUser.onboardingStep,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.signup = signup;

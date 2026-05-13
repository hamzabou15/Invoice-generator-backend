"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const loginService_1 = require("../../services/auth/loginService");
const generateTokens_1 = require("../../utils/generateTokens");
const loginSchema_1 = require("../../validators/auth/loginSchema");
// ---------------- LOGIN ----------------
const login = async (req, res) => {
    const parsed = loginSchema_1.loginSchema.parse(req.body);
    const user = await (0, loginService_1.authenticateUser)(parsed.email, parsed.password);
    const token = (0, generateTokens_1.generateAcessToken)(user._id.toString());
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // only back end dev
        sameSite: "lax",
    });
    res.status(200).json({
        token,
        message: "Login successful",
        email: user.email,
        name: user.name,
        hasCompletedOnboarding: user.hasCompletedOnboarding
    });
};
exports.login = login;

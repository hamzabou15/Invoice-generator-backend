"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendVerificationController = exports.verifyEmail = void 0;
const verifyEmailService_1 = require("../../services/auth/verifyEmailService");
// ---------------- VERIFY EMAIL ----------------
const verifyEmail = async (req, res) => {
    const { token } = req.query;
    if (!token)
        throw new Error("Token is required");
    const user = await (0, verifyEmailService_1.verifyUserEmail)(token);
    return res.redirect("http://localhost:3000/auth/login?verified=true");
};
exports.verifyEmail = verifyEmail;
// ---------------- RESEND VERIFICATION EMAIL ----------------
const resendVerificationController = async (req, res) => {
    const { email } = req.body;
    if (!email)
        throw new Error("Email is required");
    const result = await (0, verifyEmailService_1.resendVerificationEmail)(email);
    res.status(200).json(result);
};
exports.resendVerificationController = resendVerificationController;

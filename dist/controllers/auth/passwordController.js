"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.resendVerificationResetController = exports.forgotPassword = void 0;
const passwordService_1 = require("../../services/auth/passwordService");
const passwordSchemas_1 = require("../../validators/auth/passwordSchemas");
// ---------------- FORGOT PASSWORD ----------------
const forgotPassword = async (req, res) => {
    const parsed = passwordSchemas_1.foergotPasswordSchema.parse(req.body);
    console.log("Parsed email for forgot password:", parsed.email.toLowerCase());
    await (0, passwordService_1.initiatePasswordReset)(parsed.email);
    res.status(200).json({ message: "Password reset email sent" });
};
exports.forgotPassword = forgotPassword;
// --------------- RESEND VERIFICATION EMAIL RESET ----------------
const resendVerificationResetController = async (req, res) => {
    const { email } = req.body;
    if (!email)
        throw new Error("Email is required");
    const result = await (0, passwordService_1.resendVerificationEmailReset)(email);
    res.status(200).json(result);
};
exports.resendVerificationResetController = resendVerificationResetController;
// ---------------- RESET PASSWORD ----------------
const resetPassword = async (req, res) => {
    try {
        // Récupérer token depuis le body
        const { token, newPassword, newPasswordConfirm } = req.body;
        if (!token)
            return res.status(400).json({ message: "Token is required" });
        await (0, passwordService_1.resetUserPassword)(token, newPassword, newPasswordConfirm);
        res.status(200).json({ message: "Password has been reset successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message || "An error occurred" });
    }
};
exports.resetPassword = resetPassword;

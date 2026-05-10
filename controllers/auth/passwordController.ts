import { Request, Response } from "express";


import { initiatePasswordReset, resendVerificationEmailReset, resetUserPassword } from "../../services/auth/passwordService";
import { foergotPasswordSchema } from "../../validators/auth/passwordSchemas";

// ---------------- FORGOT PASSWORD ----------------
export const forgotPassword = async (req: Request, res: Response) => {
    const parsed = foergotPasswordSchema.parse(req.body);
    console.log("Parsed email for forgot password:", parsed.email.toLowerCase());
    await initiatePasswordReset(parsed.email);

    res.status(200).json({ message: "Password reset email sent" });
};

// --------------- RESEND VERIFICATION EMAIL RESET ----------------
export const resendVerificationResetController = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) throw new Error("Email is required");

    const result = await resendVerificationEmailReset(email);

    res.status(200).json(result);
};

// ---------------- RESET PASSWORD ----------------
export const resetPassword = async (req: Request, res: Response) => {
    try {
        // Récupérer token depuis le body
        const { token, newPassword, newPasswordConfirm } = req.body;

        if (!token) return res.status(400).json({ message: "Token is required" });


        await resetUserPassword(token, newPassword, newPasswordConfirm);

        res.status(200).json({ message: "Password has been reset successfully" });
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ message: error.message || "An error occurred" });
    }
};
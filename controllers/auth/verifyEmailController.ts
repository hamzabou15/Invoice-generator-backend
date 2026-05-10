import { Request, Response } from "express";
import { resendVerificationEmail, verifyUserEmail } from "../../services/auth/verifyEmailService";


// ---------------- VERIFY EMAIL ----------------
export const verifyEmail = async (req: Request, res: Response) => {
    const { token } = req.query;
    if (!token) throw new Error("Token is required");

    const user = await verifyUserEmail(token as string);

    return res.redirect("http://localhost:3000/auth/login?verified=true");
};

// ---------------- RESEND VERIFICATION EMAIL ----------------
export const resendVerificationController = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) throw new Error("Email is required");

    const result = await resendVerificationEmail(email);

    res.status(200).json(result);
};

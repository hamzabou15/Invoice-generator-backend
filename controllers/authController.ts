import { Request, Response } from "express";
import { generateAcessToken } from "../utils/generateTokens";
import {
  signupSchema,
  loginSchema,
  foergotPasswordSchema,
  resetPasswordSchema
} from "../validators/authValidator";
import {
  createUser,
  authenticateUser,
  initiatePasswordReset,
  resetUserPassword,
  verifyUserEmail,
  resendVerificationEmail,
  resendVerificationEmailReset
} from "../services/authServices";

// ---------------- SIGNUP ----------------
export const signup = async (req: Request, res: Response) => {
  const parsed = signupSchema.parse(req.body); // Validation Zod
  const newUser = await createUser(parsed.email, parsed.password, parsed.name);

  res.status(201).json({
    message: "User created successfully. Please verify your email.",
    userId: newUser._id,
  });
};

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

// ---------------- LOGIN ----------------
export const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.parse(req.body);
  const user = await authenticateUser(parsed.email, parsed.password);

  const token = generateAcessToken(user._id.toString());
  res.status(200).json({
    token,
    message: "Login successful",
    email: user.email,
    name: user.name,
    hasCompletedOnboarding: user.hasCompletedOnboarding
  });
};

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
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
  resendVerificationEmail
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

  res.status(200).json({
    message: "Email verified successfully",
    userId: user._id,
  });
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
  });
};

// ---------------- FORGOT PASSWORD ----------------
export const forgotPassword = async (req: Request, res: Response) => {
  const parsed = foergotPasswordSchema.parse(req.body);
  await initiatePasswordReset(parsed.email);

  res.status(200).json({ message: "Password reset email sent" });
};

// ---------------- RESET PASSWORD ----------------
export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token) throw new Error("Token is required");

  const parsed = resetPasswordSchema.parse(req.body);
  await resetUserPassword(token as string, parsed.newPassword, parsed.newPasswordConfirm);

  res.status(200).json({ message: "Password has been reset successfully" });
};

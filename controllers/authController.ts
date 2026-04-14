import { Request, Response } from "express";
import { generateAcessToken } from "../utils/generateTokens";
import {
  signupSchema,
  loginSchema,
  foergotPasswordSchema,
  resetPasswordSchema,
  businessSchema
} from "../validators/authValidator";
import {
  createUser,
  authenticateUser,
  initiatePasswordReset,
  resetUserPassword,
  verifyUserEmail,
  resendVerificationEmail,
  resendVerificationEmailReset,
  getUserByEmailService,
  createBusinessService
} from "../services/authServices";
import Business from "../models/Business";

// ---------------- SIGNUP ----------------
export const signup = async (req: Request, res: Response) => {
  const parsed = signupSchema.parse(req.body); // Validation Zod
  const newUser = await createUser(parsed.email, parsed.password, parsed.name);

  res.status(201).json({
    message: "User created successfully. Please verify your email.",
    userId: newUser._id,
  });
};
export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.query;
  if (!email) throw new Error("Email is required");
  try {
    const user = await getUserByEmailService(email as string);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
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

// ------------ Business USER ----------------

//  le flow logique ( au moment du login on envoie au cookies le token (via le back end))
// par la suite le authMidlleware reacuprer le token et retrive le user pour utiliser le ID

export const createBusinessController = async (req: any, res: any) => {
  try {
    // on recuper le user via le token a travers le autMiddlware
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const business = await createBusinessService({
      ...req.body,  // tout le reste du data
      user: userId, // le ID du user
    });

    return res.status(201).json({
      message: "Business created successfully",
      data: business,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
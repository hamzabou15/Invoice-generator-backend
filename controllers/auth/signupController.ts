import { createUser } from "../../services/auth/signupService";
import { generateAcessToken } from "../../utils/generateTokens";
import { Request, Response } from "express";
import { signupSchema } from "../../validators/auth/signupSchema";

// ---------------- SIGNUP ----------------
export const signup = async (
    req: Request,
    res: Response
) => {
    try {
        // validation zod
        const parsed =
            signupSchema.parse(req.body);

        // création user
        const newUser =
            await createUser(
                parsed.email,
                parsed.password,
                parsed.name
            );

        // auto login après signup
        const token =
            generateAcessToken(
                newUser._id.toString()
            );

        // cookie auth
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        return res.status(201).json({
            message:
                "Compte créé avec succès",

            user: {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name,
            },

            hasCompletedOnboarding:
                newUser.hasCompletedOnboarding,

            onboardingStep:
                newUser.onboardingStep,
        });
    } catch (error: any) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
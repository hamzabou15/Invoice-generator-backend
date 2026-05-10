import { authenticateUser } from "../../services/auth/loginService";
import { generateAcessToken } from "../../utils/generateTokens";
import { Request, Response } from "express";
import { loginSchema } from "../../validators/auth/loginSchema";

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

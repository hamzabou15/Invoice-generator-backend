import User from "../../models/User";
import bcrypt from "bcrypt";

// logic metier pour l'inscription (pas de response ici, juste la logique)
export const createUser = async (
    email: string,
    password: string,
    name?: string
) => {
    /* =========================
       NORMALIZE EMAIL
    ========================= */

    const normalizedEmail =
        email.toLowerCase().trim();

    /* =========================
       CHECK EXISTING USER
    ========================= */

    const existUser =
        await User.findOne({
            email: normalizedEmail,
        });

    if (existUser) {
        throw new Error(
            "L'utilisateur existe déjà"
        );
    }

    /* =========================
       HASH PASSWORD
    ========================= */

    const passwordHash =
        await bcrypt.hash(password, 10);

    /* =========================
       CREATE USER
    ========================= */

    const newUser =
        await User.create({
            email: normalizedEmail,

            passwordHash,

            name: name?.trim(),

            isVerified: false,

            hasCompletedOnboarding:
                false,

            onboardingStep:
                "organization",

            hasCreatedFirstQuote:
                false,

            lastLoginAt:
                new Date(),
        });

    return newUser;
};
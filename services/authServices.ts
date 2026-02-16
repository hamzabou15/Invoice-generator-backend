
// Logique métier (hash, DB, emails, tokens…

import User from "../models/User"
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail";

// logic metier pour l'inscription (pas de response ici, juste la logique)
export const createUser = async (email: string, password: string, name?: string) => {

    const existUser = await User.findOne({
        email: email
    })

    if (existUser) throw new Error("L'utilisateur existe déjà");
    const passwordHash = await bcrypt.hash(password, 10); // for hashing password

    const verificationToken = crypto.randomBytes(32).toString("hex"); // creation token for email verification

    const newUser = await User.create({
        email: email,
        passwordHash: passwordHash,
        name: name,
        verificationToken: verificationToken,
    })

    const verificationLink = `${process.env.BACKEND_URL}/api/auth/verify?token=${verificationToken}`;

    sendEmail(
        email,
        "Email Verification",
        `<p>Please click the following link to verify your email:</p>
        <a href="${verificationLink}">${verificationLink}</a>`
    )

    return newUser;

}

// logic metier pour la verification de l'email (pas de response ici, juste la logique)
export const verifyUserEmail = async (token: string) => {

    const user = await User.findOne({
        verificationToken: token,
    })

    if (!user) {
        throw new Error("Invalid or expired token");
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return user;
}

// logique metier pour renvoyer l'email de verification
export const resendVerificationEmail = async (email: string) => {
    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");
    if (user.isVerified) throw new Error("Email already verified");

    // Crée un nouveau token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;
    await user.save();

    const verificationLink = `${process.env.BACKEND_URL}/api/auth/verify?token=${verificationToken}`;

    await sendEmail(
        email,
        "Email Verification",
        `<p>Veuillez cliquer sur le lien pour vérifier votre e-mail :</p>
         <a href="${verificationLink}">${verificationLink}</a>`
    );

    return { message: "Email de vérification renvoyé avec succès" };
}


// logique metier pour le login (pas de response ici, juste la logique)
export const authenticateUser = async (email: string, password: string) => {

    const user = await User.findOne({
        email: email
    })

    if (!user) throw new Error("Adresse e-mail ou mot de passe invalide");

    const hashpassword = user.passwordHash;

    const isMatch = await bcrypt.compare(password, hashpassword);

    if (!isMatch) throw new Error("Adresse e-mail ou mot de passe invalide");
    return user;

}

// logique metier pour le forgot password (pas de response ici, juste la logique)
export const initiatePasswordReset = async (email: string) => {

    const user = await User.findOne({
        email: email
    })

    if (!user) throw new Error("User with this email does not exist");

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 heure
    await user.save();
    const resetLink = `${process.env.BACKEND_URL}/api/auth/reset-password?token=${resetToken}`;
    sendEmail(
        email,
        "Password Reset",
        `<p>Please click the following link to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>`
    );
    return user;

}

// logique metier pour le reset password (pas de response ici, juste la logique)
export const resetUserPassword = async (token:string , newPassword:string, newPasswordConfirm:string) => {
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() }, // la date d'expiration doit être dans le futur
    })

    if(!user) throw new Error("Invalid or expired token");

    const isPasswordIdentical = await bcrypt.compare(newPassword, user.passwordHash);

    if(isPasswordIdentical) throw new Error("New password must be different from the old password");

    if(newPassword !== newPasswordConfirm) throw new Error("Passwords do not match");

    const passwordHash = await bcrypt.hash(newPassword, 10);

    user.passwordHash = passwordHash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return user;
}
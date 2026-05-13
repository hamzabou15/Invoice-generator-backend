"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserPassword = exports.resendVerificationEmailReset = exports.initiatePasswordReset = void 0;
const User_1 = __importDefault(require("../../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
// logique metier pour le forgot password (pas de response ici, juste la logique)
const initiatePasswordReset = async (email) => {
    const user = await User_1.default.findOne({
        email: { $regex: `^${email}$`, $options: "i" }
    });
    if (!user)
        throw new Error("User with this email does not exist");
    const resetToken = crypto_1.default.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 heure
    await user.save();
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;
    await (0, sendEmail_1.default)(email, "Réinitialisation de votre mot de passe - Facturuo", `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 40px 0;">
    <table align="center" width="100%" style="max-width: 600px; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <tr>
        <td style="background: #4F46E5; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">
            Facturuo
          </h1>
        </td>
      </tr>

      <!-- Content -->
      <tr>
        <td style="padding: 30px; color: #333333;">
          <h2 style="margin-top: 0;">Réinitialisation du mot de passe</h2>
          
          <p>
            Bonjour,<br><br>
            Vous avez demandé à réinitialiser votre mot de passe sur <strong>Facturuo</strong>.
          </p>

          <p>
            Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe :
          </p>

          <!-- Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
              style="
                background: #4F46E5;
                color: #ffffff;
                padding: 14px 28px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
                display: inline-block;
              ">
              Réinitialiser mon mot de passe
            </a>
          </div>

          <p style="font-size: 14px; color: #666;">
            Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email.
          </p>

          <p style="font-size: 14px; color: #666;">
            Ce lien expirera dans quelques minutes pour des raisons de sécurité.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #999;">
          © ${new Date().getFullYear()} Facturuo. Tous droits réservés.
        </td>
      </tr>

    </table>
  </div>
  `);
    return user;
};
exports.initiatePasswordReset = initiatePasswordReset;
// logique metier pour renvoyer l'email de verification
const resendVerificationEmailReset = async (email) => {
    const user = await User_1.default.findOne({ email: email });
    if (!user)
        throw new Error("User not found");
    // Crée un nouveau token pour reset password
    const resetToken = crypto_1.default.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1h
    await user.save();
    // Lien qui va vers le frontend Next.js
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;
    await (0, sendEmail_1.default)(email, "Réinitialisation de mot de passe", `<p>Veuillez cliquer sur le lien pour réinitialiser votre mot de passe :</p>
        <a href="${resetLink}">Réinitialiser mon mot de passe</a>`);
    return { message: "Email de réinitialisation envoyé avec succès" };
};
exports.resendVerificationEmailReset = resendVerificationEmailReset;
// logique metier pour le reset password (pas de response ici, juste la logique)
const resetUserPassword = async (token, newPassword, newPasswordConfirm) => {
    if (!token)
        throw new Error("Token is required");
    if (newPassword !== newPasswordConfirm)
        throw new Error("Passwords do not match");
    // trim() pour éviter les espaces
    const cleanToken = token.trim();
    const user = await User_1.default.findOne({
        resetPasswordToken: cleanToken,
        resetPasswordExpires: { $gt: new Date() },
    });
    if (!user)
        throw new Error("Lien invalide ou expiré");
    const isPasswordIdentical = await bcrypt_1.default.compare(newPassword, user.passwordHash);
    if (isPasswordIdentical)
        throw new Error("Le nouveau mot de passe doit être différent de l'ancien.");
    const passwordHash = await bcrypt_1.default.hash(newPassword, 10);
    user.passwordHash = passwordHash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return { message: "Password reset successful" };
};
exports.resetUserPassword = resetUserPassword;

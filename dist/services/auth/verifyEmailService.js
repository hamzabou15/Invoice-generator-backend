"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendVerificationEmail = exports.verifyUserEmail = void 0;
const User_1 = __importDefault(require("../../models/User"));
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
const crypto_1 = __importDefault(require("crypto"));
// logic metier pour la verification de l'email (pas de response ici, juste la logique)
const verifyUserEmail = async (token) => {
    const user = await User_1.default.findOne({
        verificationToken: token,
    });
    if (!user) {
        throw new Error("Lien invalide ou expiré");
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    return user;
};
exports.verifyUserEmail = verifyUserEmail;
// logique metier pour renvoyer l'email de verification
const resendVerificationEmail = async (email) => {
    const user = await User_1.default.findOne({ email });
    if (!user)
        throw new Error("User not found");
    if (user.isVerified)
        throw new Error("Email already verified");
    // Crée un nouveau token
    const verificationToken = crypto_1.default.randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;
    user.verificationTokenExpires = new Date(Date.now() + 600000); // 1 heure
    await user.save();
    const verificationLink = `${process.env.BACKEND_URL}/api/auth/verify?token=${verificationToken}`;
    await (0, sendEmail_1.default)(email, "Vérifiez votre adresse email - Facturuo", `
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
          <h2 style="margin-top: 0;">Confirmez votre email</h2>
          
          <p>
            Bonjour,<br><br>
            Merci de vous être inscrit sur <strong>Facturuo</strong> 🎉
          </p>

          <p>
            Pour activer votre compte, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :
          </p>

          <!-- Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" 
              style="
                background: #10B981;
                color: #ffffff;
                padding: 14px 28px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
                display: inline-block;
              ">
              Vérifier mon email
            </a>
          </div>

          <p style="font-size: 14px; color: #666;">
            Si le bouton ne fonctionne pas, vous pouvez copier-coller ce lien dans votre navigateur :
          </p>

          <p style="word-break: break-all; font-size: 13px; color: #4F46E5;">
            ${verificationLink}
          </p>

          <p style="font-size: 14px; color: #666;">
            Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.
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
    return { message: "Email de vérification renvoyé avec succès" };
};
exports.resendVerificationEmail = resendVerificationEmail;

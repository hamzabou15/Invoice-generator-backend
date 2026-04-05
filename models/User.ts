import mongoose, { mongo } from "mongoose";

interface IUser extends mongoose.Document {
    email: string; // adress email
    passwordHash: string; // le mot de passe 
    name?: string; // le nom de l'utilisateur
    isVerified: boolean; // indique si l'utilisateur a vérifié son adresse email
    verificationToken?: string; // token utilisé pour la vérification de l'email
    verificationTokenExpires?: Date; // date d'expiration du token de vérification de l'email
    resetPasswordToken?: string; // token utilisé pour la réinitialisation du mot de passe
    verificationResetToken?: string; // token utilisé pour la réinitialisation de la vérification de l'email
    resetPasswordExpires?: Date; // date d'expiration du token de réinitialisation du mot de passe
    /**** Onboarding *****/
    hasCompletedOnboarding: boolean; // indique si l'utilisateur a complété l'onboarding (Bussines)
    createdAt: Date;
    updatedAt: Date;
}


const userSchema = new mongoose.Schema<IUser>({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
    isVerified: { type: Boolean, default: false },

    verificationToken: { type: String },
    verificationTokenExpires: { type: Date }, // dae d'expiration du token de vérification de l'email

    resetPasswordToken: { type: String },
    verificationResetToken: { type: String },
    resetPasswordExpires: { type: Date },

    createdAt: { type: Date, default: Date.now },
})

const User = mongoose.model<IUser>('User', userSchema);

export default User;
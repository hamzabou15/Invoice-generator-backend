// import mongoose, { mongo } from "mongoose";

// interface IUser extends mongoose.Document {
//     email: string; // adress email
//     passwordHash: string; // le mot de passe 
//     name?: string; // le nom de l'utilisateur
//     isVerified: boolean; // indique si l'utilisateur a vérifié son adresse email
//     verificationToken?: string; // token utilisé pour la vérification de l'email
//     verificationTokenExpires?: Date; // date d'expiration du token de vérification de l'email
//     resetPasswordToken?: string; // token utilisé pour la réinitialisation du mot de passe
//     verificationResetToken?: string; // token utilisé pour la réinitialisation de la vérification de l'email
//     resetPasswordExpires?: Date; // date d'expiration du token de réinitialisation du mot de passe
//     numberPhone?: string;
//     job?:string;
//     /**** Onboarding *****/
//     hasCompletedOnboarding: boolean; // indique si l'utilisateur a complété l'onboarding (Bussines)
//     createdAt: Date;
//     updatedAt: Date;
// }


// const userSchema = new mongoose.Schema<IUser>(
//     {
//         email: { type: String, required: true, unique: true },
//         passwordHash: { type: String, required: true },
//         name: { type: String },
//         isVerified: { type: Boolean, default: false },
//         numberPhone: { type: String },
//         verificationToken: { type: String },
//         verificationTokenExpires: { type: Date },
//         job: {type:String},
//         resetPasswordToken: { type: String },
//         verificationResetToken: { type: String },
//         resetPasswordExpires: { type: Date },

//         hasCompletedOnboarding: { type: Boolean, default: false },
//     },
//     { timestamps: true } //  ça gère createdAt + updatedAt automatiquement
// );

// const User = mongoose.model<IUser>('User', userSchema);

// export default User;


import mongoose, { Document, Model } from "mongoose";

/* =========================
   USER INTERFACE
========================= */
export interface IUser extends Document {
    email: string;
    passwordHash: string;

    // Profil
    name?: string;
    numberPhone?: string;
    job?: string;
    avatar?: string;

    // Auth
    isVerified: boolean;

    verificationToken?: string;
    verificationTokenExpires?: Date;

    resetPasswordToken?: string;
    resetPasswordExpires?: Date;

    // Onboarding
    hasCompletedOnboarding: boolean;

    onboardingStep?:
    | "signup"
    | "organization"
    | "first-client"
    | "first-quote"
    | "completed";

    hasCreatedFirstQuote: boolean;

    // UX SaaS
    lastOrganization?: mongoose.Types.ObjectId;

    // Metadata
    lastLoginAt?: Date;

    createdAt: Date;
    updatedAt: Date;
}

/* =========================
   USER MODEL
========================= */
const userSchema = new mongoose.Schema<IUser>(
    {
        /* =========================
           AUTH
        ========================= */
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        passwordHash: {
            type: String,
            required: true,
        },

        /* =========================
           PROFILE
        ========================= */
        name: {
            type: String,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        numberPhone: {
            type: String,
            trim: true,
        },

        job: {
            type: String,
            trim: true,
        },

        avatar: {
            type: String,
        },

        /* =========================
           EMAIL VERIFICATION
        ========================= */
        isVerified: {
            type: Boolean,
            default: false,
        },

        verificationToken: {
            type: String,
        },

        verificationTokenExpires: {
            type: Date,
        },

        /* =========================
           RESET PASSWORD
        ========================= */
        resetPasswordToken: {
            type: String,
        },

        resetPasswordExpires: {
            type: Date,
        },

        /* =========================
           ONBOARDING
        ========================= */
        hasCompletedOnboarding: {
            type: Boolean,
            default: false,
        },

        onboardingStep: {
            type: String,
            enum: [
                "signup",
                "organization",
                "first-client",
                "first-quote",
                "completed",
            ],
            default: "signup",
        },

        hasCreatedFirstQuote: {
            type: Boolean,
            default: false,
        },

        /* =========================
           MULTI-ORG UX
        ========================= */
        lastOrganization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
        },

        /* =========================
           METADATA
        ========================= */
        lastLoginAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

/* =========================
   INDEXES
========================= */

// recherche email rapide
userSchema.index({ email: 1 });

// onboarding analytics
userSchema.index({ onboardingStep: 1 });

// multi-tenant UX
userSchema.index({ lastOrganization: 1 });

/* =========================
   TRANSFORM JSON
========================= */

userSchema.set("toJSON", {
    transform: (_doc, ret) => {
        // delete ret.passwordHash;
        delete ret.verificationToken;
        delete ret.resetPasswordToken;

        return ret;
    },
});

/* =========================
   MODEL
========================= */

const User: Model<IUser> = mongoose.model<IUser>(
    "User",
    userSchema
);

export default User;
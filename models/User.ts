import mongoose, { mongo } from "mongoose";

interface IUser extends mongoose.Document {
    email: string;
    passwordHash: string;
    name?: string;
    isVerified: boolean;
    verificationToken?: string;
    resetPasswordToken?: string;
    verificationResetToken?: string;
    resetPasswordExpires?: Date;
    createdAt: Date;
    updatedAt: Date;
}


const userSchema = new mongoose.Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        name: { type: String },
        isVerified: { type: Boolean, default: false },
        verificationToken: { type: String },
        resetPasswordToken: { type: String },
        verificationResetToken: { type: String },
        resetPasswordExpires: { type: Date },
        createdAt: { type: Date, default: Date.now },
    }
)

const User = mongoose.model<IUser>('User', userSchema);

export default User;
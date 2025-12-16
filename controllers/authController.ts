import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail";
import { generateAcessToken } from "../utils/generateTokens";

// SIGNUP
const signup = async (req: Request, res: Response) => {

    try {

        const findUser = await User.findOne({ email: req.body.email });
        if (findUser) {
            return res.status(400).json({ message: 'User already exists' });
        } else {
            const passwordHash = await bcrypt.hash(req.body.password, 10); // for hashing password
            const verificationToken = crypto.randomBytes(32).toString("hex"); // creation token for email verification

            // Send verification email
            const verificationLink = `${req.protocol}://${req.get("host")}/api/auth/verify?token=${verificationToken}`;

            await sendEmail(
                req.body.email,
                "Email Verification",
                `<p>Please click the following link to verify your email:</p>
                <a href="${verificationLink}">${verificationLink}</a>`
            )

            // Create new user
            const newUser = await User.create({
                email: req.body.email,
                passwordHash: passwordHash,
                name: req.body.name,
                verificationToken: verificationToken,
            });
            return res.status(201).json({ message: 'User created successfully', userId: newUser._id });
        }

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: error });

    }

}


const verifyEmail = async (req: Request, res: Response) => {

    try {
        const { token } = req.query;
        const existUser = await User.findOne({
            verificationToken: token as string,
        });

        if (!existUser) {
            return res.status(400).json({
                message: "Invalid or expired token",
            });
        }

        existUser.isVerified = true;
        existUser.verificationToken = undefined;

        await existUser.save();

        return res.status(200).json({
            message: "Email verified successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


const login = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;
        const userfind = await User.findOne({
            email: email
        })

        if (!userfind || userfind.isVerified === false) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, userfind.passwordHash);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        const token = generateAcessToken(userfind._id.toString());
        res.json({
            token
            , message: "Login successful"
        })
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: error });
    }

}


const forgotPassword = async (req: Request, res: Response) => {

    try {
        const { email } = req.body
        const findUser = await User.findOne({ email });

        if (!findUser) return res.status(400).json({ message: "User not found" });

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        findUser.resetPasswordToken = resetToken;
        findUser.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

        await findUser.save();

        // Send reset email
        const resetLink = `${req.protocol}://${req.get("host")}/api/auth/reset-password?token=${resetToken}`;
        await sendEmail(
            email,
            "Password Reset",
            `<p>Please click the following link to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>`
        );


    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: error });
    }

}


const resetPassword = async (req: Request, res: Response) => {

    try {
        const { token } = req.query;
        const { newPassword } = req.body;
        const { newPasswordConfirm } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        const user = await User.findOne({
            resetPasswordToken: token as string,
            resetPasswordExpires: { $gt: new Date() },

        })
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const isPasswordIdentical = await bcrypt.compare(newPassword, user.passwordHash);

        if (isPasswordIdentical) {
            return res.status(400).json({ message: "New password must be different from the old password" });
        }

        if (newPassword !== newPasswordConfirm) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const passwordHash = await bcrypt.hash(newPassword, 10);

        user.passwordHash = passwordHash;
        console.log("user", user);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        res.status(200).json({ message: "Password reset successful" });


    } catch (error) {

        console.log("error", error);
        res.status(500).json({ message: error });
    }

}

export { signup, verifyEmail, login, forgotPassword, resetPassword };
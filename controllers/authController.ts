import { Request, Response, NextFunction } from "express";
import user from "../models/User";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail";

// SIGNUP
const signup = async (req: Request, res: Response) => {

    try {

        const findUser = await user.findOne({ email: req.body.email });
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
            const newUser = await user.create({
                email: req.body.email,
                passwordHash: passwordHash,
                name: req.body.name,
                verificationToken: verificationToken,
            });
            return res.status(201).json({ message: 'User created successfully', userId: newUser._id });
        }

    } catch (error) {
        console.log("error hhhhhhh", error);
        res.status(500).json({ message: error });

    }

}

export { signup };
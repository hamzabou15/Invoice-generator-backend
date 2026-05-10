import { Request, Response } from "express";
import { getUserByEmailService } from "../../services/user/userByEmailService";


export const getUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.query;
    if (!email) throw new Error("Email is required");
    try {
        const user = await getUserByEmailService(email as string);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

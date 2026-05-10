import { Request, Response } from "express";
import { getMeService } from "../../services/user/getUserService";


export const getMe = async (req: any, res: any) => {
    try {
        // communication with DB
        const user = await getMeService(req.user.id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
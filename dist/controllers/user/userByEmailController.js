"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = void 0;
const userByEmailService_1 = require("../../services/user/userByEmailService");
const getUserByEmail = async (req, res) => {
    const { email } = req.query;
    if (!email)
        throw new Error("Email is required");
    try {
        const user = await (0, userByEmailService_1.getUserByEmailService)(email);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getUserByEmail = getUserByEmail;

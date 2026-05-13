"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const getUserService_1 = require("../../services/user/getUserService");
const getMe = async (req, res) => {
    try {
        // communication with DB
        const user = await (0, getUserService_1.getMeService)(req.user.id);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
exports.getMe = getMe;

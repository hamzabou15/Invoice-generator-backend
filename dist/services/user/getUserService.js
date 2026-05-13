"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeService = void 0;
const User_1 = __importDefault(require("../../models/User"));
// service to get the user 
const getMeService = async (userId) => {
    const user = await User_1.default.findById(userId)
        .select("name email numberPhone job")
        .lean();
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};
exports.getMeService = getMeService;

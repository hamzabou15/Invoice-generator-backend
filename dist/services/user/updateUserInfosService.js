"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserInformationsService = void 0;
const User_1 = __importDefault(require("../../models/User"));
const updateUserInformationsService = async ({ userId, email, name, numberPhone, job }) => {
    const updateData = {};
    if (email) {
        updateData.email = email;
    }
    if (name) {
        updateData.name = name;
    }
    if (numberPhone) {
        updateData.numberPhone = numberPhone;
    }
    if (job) {
        updateData.job = job;
    }
    const user = await User_1.default.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        throw new Error("Utilisateur introuvable");
    }
    return user;
};
exports.updateUserInformationsService = updateUserInformationsService;

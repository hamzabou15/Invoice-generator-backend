"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const User_1 = __importDefault(require("../../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// logique metier pour le login (pas de response ici, juste la logique)
const authenticateUser = async (email, password) => {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User_1.default.findOne({
        email: normalizedEmail
    });
    if (!user)
        throw new Error("Adresse e-mail ou mot de passe invalide");
    const hashpassword = user.passwordHash;
    const isMatch = await bcrypt_1.default.compare(password, hashpassword);
    if (!isMatch)
        throw new Error("Adresse e-mail ou mot de passe invalide");
    return user;
};
exports.authenticateUser = authenticateUser;

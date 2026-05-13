"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusinessByUserController = exports.createBusinessController = void 0;
const authServices_1 = require("../services/authServices");
const User_1 = __importDefault(require("../models/User"));
// ------------ Business USER ----------------
//  le flow logique ( au moment du login on envoie au cookies le token (via le back end))
// par la suite le authMidlleware reacuprer le token et retrive le user pour utiliser le ID
const createBusinessController = async (req, res) => {
    try {
        // on recuper le user via le token a travers le autMiddlware
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated",
            });
        }
        const business = await (0, authServices_1.createBusinessService)({
            ...req.body, // tout le reste du data
            user: userId, // le ID du user
        });
        const getUser = await User_1.default.findById(userId);
        if (getUser) {
            getUser.hasCompletedOnboarding = true;
            await getUser.save();
        }
        return res.status(201).json({
            message: "Business created successfully",
            data: business,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
exports.createBusinessController = createBusinessController;
// get Busines
const getBusinessByUserController = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const business = await (0, authServices_1.getBusinessByUserService)(userId);
        return res.status(200).json(business);
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
exports.getBusinessByUserController = getBusinessByUserController;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusinessByUserService = exports.createBusinessService = void 0;
const Business_1 = __importDefault(require("../models/Business"));
const mongoose_1 = __importDefault(require("mongoose"));
const createBusinessService = async (data) => {
    const existing = await Business_1.default.findOne({ user: data.user });
    if (existing) {
        throw new Error("Un compte business existe déjà pour cet utilisateur.");
    }
    const business = await Business_1.default.create(data);
    return business;
};
exports.createBusinessService = createBusinessService;
const getBusinessByUserService = async (userId) => {
    const business = await Business_1.default.findOne({
        user: new mongoose_1.default.Types.ObjectId(userId),
    });
    if (!business) {
        throw new Error("Business not found");
    }
    return business;
};
exports.getBusinessByUserService = getBusinessByUserService;

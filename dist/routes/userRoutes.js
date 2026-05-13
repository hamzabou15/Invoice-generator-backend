"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMidlleware_1 = require("../middlewares/authMidlleware");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const getMeController_1 = require("../controllers/user/getMeController");
const updateUserInfosController_1 = require("../controllers/user/updateUserInfosController");
const router = express_1.default.Router();
router.get('/getMe', authMidlleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(getMeController_1.getMe));
router.put("/update-user", authMidlleware_1.authMiddleware, updateUserInfosController_1.updateUserInformationsController);
exports.default = router;

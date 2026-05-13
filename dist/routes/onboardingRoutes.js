"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const onboardingController_1 = require("../controllers/auth/onboardingController");
const express_1 = __importDefault(require("express"));
const authMidlleware_1 = require("../middlewares/authMidlleware");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const router = express_1.default.Router();
router.post('/workspace', authMidlleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(onboardingController_1.selectWorkspaceController));
exports.default = router;

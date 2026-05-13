"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./types/express");
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const onboardingRoutes_1 = __importDefault(require("./routes/onboardingRoutes"));
const organizationRoutes_1 = __importDefault(require("./routes/organizationRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
// 🔥 CORS
app.use((0, cors_1.default)({
    origin: "http://10.32.13.128:3000",
    credentials: true,
}));
app.use(express_1.default.json());
(0, db_1.default)();
// ROUTES
app.use("/api/auth", authRoutes_1.default);
app.use("/api/user", userRoutes_1.default);
app.use("/api/onboarding", onboardingRoutes_1.default);
app.use("/api/organization", organizationRoutes_1.default);
// ERROR HANDLER
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

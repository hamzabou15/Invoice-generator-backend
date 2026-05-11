import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

import onboardingRoutes from "./routes/onboardingRoutes";
import organizationRoutes from "./routes/organizationRoutes";


import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());

// 🔥 CORS DOIT ÊTRE EN PREMIER
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/organization", organizationRoutes);




// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());

// 🔥 CORS DOIT ÊTRE EN PREMIER
app.use(
  cors({
    origin: "http://10.32.13.128:3000",
    credentials: true,
  })
);

app.use(express.json());

connectDB();

// routes
app.use("/api/auth", authRoutes);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
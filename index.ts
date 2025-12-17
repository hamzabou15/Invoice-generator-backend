import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';

// Load env variables FIRST
dotenv.config();

// Create app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Middleware global 
app.use(errorHandler);

app.use(cors({ origin: 'http://localhost:3000' }));

// Port from env
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});




import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dns from "dns";
import { v2 as cloudinary } from "cloudinary";

import myUserRoute from "./routes/MyUserRoute.ts";
import myRestaurantRoute from "./routes/MyResturantRoute.ts";
import orderRoute from "./routes/OrderRoute.ts";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Stripe webhook
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Food Ordering API is running...");
});

// MongoDB connection
let connectionPromise: Promise<typeof mongoose> | null = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING as string
    ).catch((error) => {
      connectionPromise = null;
      throw error;
    });
  }

  return connectionPromise;
};

// Connect DB before API routes
app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// Routes
app.use("/api/my/user", myUserRoute);
app.use("/api/my/resturant", myRestaurantRoute);
app.use("/api/order", orderRoute);

export default app;

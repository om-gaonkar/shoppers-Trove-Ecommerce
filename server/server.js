import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/connectDB.js";

import authRouter from "./routes/auth/authRoutes.js";
import adminProductRouter from "./routes/admin/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

//database connection
connectDB();
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

// middleware connection
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductRouter);

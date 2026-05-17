import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import newsRoutes from "./routes/news.routes.js";
import aiRoutes from "./routes/ai.routes.js"

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://news-fullstack-eight.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());




app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/ai", aiRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
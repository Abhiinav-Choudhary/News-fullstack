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


app.set("trust proxy", 1);

app.use(cors({
  origin: function(origin, callback) {

    if (!origin) {
      return callback(null, true);
    }

    if (
      origin === "http://localhost:5173" ||
      origin.includes("vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }

  },

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
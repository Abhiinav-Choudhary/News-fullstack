import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  register,
  login,
  logout,
  getMe
} from "../controllers/auth.controller.js";

import {
  googleAuth
} from "../controllers/googleAuth.controller.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", authMiddleware, getMe);

router.post(
  "/google",
  googleAuth
);

export default router;
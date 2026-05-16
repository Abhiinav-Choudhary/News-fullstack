import express from "express";

import { summarizeNews } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/summarize", summarizeNews);

export default router;
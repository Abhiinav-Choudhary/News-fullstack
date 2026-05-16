import express from "express";

import {
  getTopHeadlines,
  getCategoryNews,
  searchNews
} from "../controllers/news.controller.js";

const router = express.Router();


// TOP HEADLINES
router.get(
  "/top-headlines",
  getTopHeadlines
);


// CATEGORY NEWS
router.get(
  "/category/:category",
  getCategoryNews
);


// SEARCH NEWS
router.get(
  "/search",
  searchNews
);

export default router;
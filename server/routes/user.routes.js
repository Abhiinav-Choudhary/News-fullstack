import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  getProfile,
  addBookmark,
  getBookmarks,
  deleteBookmark
} from "../controllers/user.controller.js";

const router = express.Router();


// PROFILE
router.get(
  "/profile",
  authMiddleware,
  getProfile
);


// BOOKMARKS
router.post(
  "/bookmark",
  authMiddleware,
  addBookmark
);

router.get(
  "/bookmarks",
  authMiddleware,
  getBookmarks
);

router.delete(
  "/bookmark/:id",
  authMiddleware,
  deleteBookmark
);

export default router;
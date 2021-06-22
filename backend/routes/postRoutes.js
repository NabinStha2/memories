import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsByCreator,
  commentPost,
} from "../controllers/postController.js";
import { authorization } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/creators/:name", getPostsByCreator);

router.get("/:id", getPostById);

router.post("/", authorization, createPost);

router.patch("/:id", authorization, updatePost);

router.delete("/:id", authorization, deletePost);

router.patch("/like/:id", authorization, likePost);

router.post("/:id/commentPost", commentPost);

export default router;

import express from "express";
import { getPost, getCategory, addPost, deletePost } from "../modules/posts.js";
const router = express.Router();
router.post("/category", (req, res) => {
  const { category } = req.body;
  getCategory(category).then((matchingCategory) => res.json(matchingCategory));
});
router.post("/", (req, res) => {
  const { postId } = req.body;
  getPost(postId).then((post) => res.json(post));
});

router.patch("/:id", (req, res) => {
  console.log("patch req recieved for post");
  addPost(req.params.id, req.body).then((post) => {
    res.json(post);
  });
});
router.delete("/", (req, res) => {
  console.log("delete post req recieved");
  const { userId, postId } = req.body;
  deletePost(userId, postId).then(() => {
    res.json({ message: "Post Deleted" });
  });
});

export default router;

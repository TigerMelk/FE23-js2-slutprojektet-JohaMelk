import express from "express";
import { addComment, deleteComment } from "./comments.js";
const router = express.Router();
router.patch("/", (req, res) => {
  console.log("patch req recieved for comment");
  const { userId, postId, commentText } = req.body;
  addComment(userId, postId, commentText).then((newComment) =>
    res.json(newComment)
  );
});
router.delete("/", (req, res) => {
  const { commentId } = req.body;
  deleteComment(commentId).then(() => {
    res.json({ message: "Comment deleted" });
  });
});

export default router;

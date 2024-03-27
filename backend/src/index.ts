import express from "express";
import cors from "cors";
import usersRouter from "./usersRouter.js";
import postsRouter from "./postsRouter.js";
import commentsRouter from "./commentsRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);

app.listen(3000, () => {
  console.log("Listening to port 3000");
});

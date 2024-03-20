import express from "express";
// import cors from "cors";
import * as db from "./handledatabase.js";
const app = express();
app.use(express.json());
// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/api/:id?", (req, res) => {
  console.log("get req recieved");

  if (req.params.id) {
    db.getUser(req.params.id).then((user) => {
      if (user) res.json(user);
    });
  } else {
    db.getUsers().then((users) => {
      if (users) res.json(users);
    });
  }
});
//! denna funkar :)
app.post("/api/users", (req, res) => {
  const { name, password, image } = req.body;
  const newUser = {
    id: "",
    name,
    password,
    image,
    admin: false,
    comments: [],
    posts: [],
  };
  const addedUser = db.addUser(newUser).then(() => res.json(addedUser));
});
// app.put()
//! denna är dogshit :)) (men funkar egentligen)
app.patch("/api/:id?/post/", (req, res) => {
  console.log("patch req recieved for post");
  if (req.params.id) {
    db.addPost(req.params.id, req.body).then((post) => {
      res.json(post);
    });
  }
});
//! borde funka..
app.patch("/api/:id?/post/comment", (req, res) => {
  console.log("patch req recieved for comment");
  const { id: postId } = req.params;
  const { userId, comment } = req.body;
  const addedComment = db
    .addComment(userId, postId, comment)
    .then(() => res.json(addedComment));
});
// app.delete()

app.listen(3000, () => {
  console.log("listening to port 3000");
});

import express from "express";
// import cors from "cors";
import * as db from "./handledatabase.js";
import { error } from "console";
const app = express();
app.use(express.json());
// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// getUser eller Users
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
//! funkar
// login
app.get("/api/login/user", (req, res) => {
  const { name, password } = req.body;
  console.log(req.body);
  if (!name || !password) {
    throw new Error("Name and password required");
  }
  db.logIn(name, password).then((user) => {
    if (user) res.json(user);
    else throw new Error("user not found");
  });
});
// getPost //! funkar
app.get("/api/user/post", (req, res) => {
  const { userId, postId } = req.body;
  db.getPost(userId, postId).then((post) => res.json(post));
});

// get all comments or posts from user
app.get("/api/user/data/", (req, res) => {
  const { userId, dataType } = req.body;
  console.log(userId, dataType);
  db.getUserData(userId, dataType).then((userData) => {
    res.json(userData);
  });
});
//! denna funkar :)
// addUser
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
// addPost
//! funkar
app.patch("/api/:id?/post/", (req, res) => {
  console.log("patch req recieved for post");
  if (req.params.id) {
    db.addPost(req.params.id, req.body).then((post) => {
      res.json(post);
    });
  }
});
//! borde funka..
// addComment
app.patch("/api/post/comment", (req, res) => {
  console.log("patch req recieved for comment");
  const { userId, postId, commentText } = req.body;
  db.addComment(userId, postId, commentText).then((newComment) =>
    res.json(newComment)
  );
});
//
// delete user //!funkar
app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  db.deleteUser(userId).then(() => res.json({ message: "User Deleted" }));
});

app.listen(3000, () => {
  console.log("listening to port 3000");
});

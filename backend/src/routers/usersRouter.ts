import express from "express";
import {
  getUser,
  getUsers,
  getUserData,
  logIn,
  addUser,
  deleteUser,
} from "../modules/users.js";

const router = express.Router();
router.post("/login", (req, res) => {
  const { name, password } = req.body;
  console.log(req.body);
  if (!name || !password) {
    throw new Error("Name and password required");
  }
  logIn(name, password).then((user) => {
    if (user) res.json(user);
    else throw new Error("user not found");
  });
});
router.post("/userdata", (req, res) => {
  const { userId, dataType } = req.body;
  console.log(userId, dataType);
  getUserData(userId, dataType).then((userData) => {
    res.json(userData);
  });
});
router.get("/:id?", (req, res) => {
  console.log("get req recieved for users");

  if (req.params.id) {
    getUser(req.params.id).then((user) => {
      if (user) res.json(user);
    });
  } else {
    getUsers().then((users) => {
      if (users) res.json(users);
    });
  }
});

router.post("/", async (req, res) => {
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
  try {
    const addedUser = await addUser(newUser);
    if ("message" in addedUser) {
      return res.json({ message: addedUser.message });
    }
    res.json(addedUser);
  } catch (error) {
    console.error("error adding new user", error);
    res.status(404).json({ message: "Error adding user" });
  }
});

router.delete("/:id", (req, res) => {
  const userId = req.params.id;
  deleteUser(userId).then(() => res.json({ message: "User Deleted" }));
});

export default router;

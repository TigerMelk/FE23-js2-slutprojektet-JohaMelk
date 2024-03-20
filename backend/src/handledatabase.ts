import fs from "fs/promises";
import { User, Comment, Post } from "./userType.js";
import crypto from "crypto";
import { error } from "console";
//database read and write
async function readDatabase() {
  const rawDbBuffer: Buffer = await fs.readFile("./src/db.json");
  const rawDb: string = rawDbBuffer.toString("utf-8");
  return JSON.parse(rawDb);
}
async function writeDatabase(users: User[]): Promise<void> {
  const db = { users };
  await fs
    .writeFile("./src/db.json", JSON.stringify(db, null, 2))
    .then(() => {
      console.log("database updated correctly");
    })
    .catch((error) => {
      console.error("error writing database", error);
    });
}
//
// get functions
async function getUsers(): Promise<User[]> {
  const db = await readDatabase();
  return db.users;
}
async function getUser(id: string): Promise<User | { message: string }> {
  const users = await getUsers();
  const user = users.find((user: User) => user.id == id);
  if (user) return user;
  else return { message: "user not found" };
}
// get comments eller posts //! behöver testas
async function getUserData(
  user: User,
  data: "comments" | "posts"
): Promise<Comment[] | Post[] | { message: string }> {
  const foundUser = await getUser(user.id);
  if ("comments" in foundUser && "posts" in foundUser) {
    return data === "comments" ? foundUser.comments : foundUser.posts;
  } else return { message: "no data found" };
}

//
// Post functions
// ! denna funkar som den ska
async function addUser(user: User): Promise<User> {
  const users = await getUsers();

  const existingName = users.find(
    (existingName) => existingName.name === user.name
  );
  if (existingName) {
    throw new Error("User with that name already exists");
  }

  const id = crypto.randomUUID();
  const newUser: User = {
    id,
    name: user.name,
    password: user.password,
    image: user.image,
    admin: false,
    comments: [],
    posts: [],
  };
  users.push(newUser);
  await writeDatabase(users);
  return newUser;
}

// Patch functions
//! borde funka men gör inte det??? kolla console så förstår ni :/
async function addPost(userId: string, post: Post): Promise<Post> {
  const user = await getUser(userId);
  //   console.log(user);
  const newPost: Post = { id: crypto.randomUUID(), userId, ...post };

  if ("posts" in user) {
    user.posts.push(newPost);
    console.log(user);
    // console.log(newPost);

    await writeDatabase(await getUsers());
    return newPost;
  } else throw new Error("posts in user not found");
}
//! denna borde funka men kan inte testa riktigt utan addPost function
async function addComment(
  userId: string,
  postId: string,
  comment: Comment
): Promise<Comment> {
  const user = await getUser(userId);
  if (!("id" in user && "comments" in user && "posts" in user)) {
    throw new Error("User not found");
  }
  const userComment: Comment = { userId, ...comment };
  const post = user.posts.find((post) => post.id === postId);
  if (!post) {
    throw new Error("Post not found");
  }
  user.comments.push(userComment);
  post.comments.push(userComment);
  await writeDatabase(await getUsers());
  return userComment;
}

//? delete functions

export {
  readDatabase,
  writeDatabase,
  getUser,
  getUsers,
  getUserData,
  addUser,
  addComment,
  addPost,
};

import fs from "fs/promises";
import { User, Comment, Post } from "./userType.js";
//database read and write
async function readDatabase() {
  const rawDbBuffer: Buffer = await fs.readFile("./src/db.json");
  const rawDb: string = rawDbBuffer.toString("utf-8");
  return JSON.parse(rawDb);
}
async function writeDatabase(users: User) {
  const db = { users };
  const done = await fs.writeFile("./src/db.json", JSON.stringify(db, null, 2));
  return done;
}
//
// get functions
async function getUsers(): Promise<User[]> {
  const db = await readDatabase();
  return db.users;
}
//! promise type fel
async function getUser(id: string): Promise<User | { message: string }> {
  const users = await getUsers();
  const user = users.find((user: User) => user.id == id);
  if (user) return user;
  else return { message: "user not found" };
}
// get comments eller posts
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
async function addUser(user: Omit<User, "id">): Promise<User> {
  const newUser: User = { id: crypto.randomUUID(), ...user };
  const users = await getUsers();
  //! if users.name existerar redan skit i detta
  users.push(newUser);
  await writeDatabase(users[0]);
  return newUser;
}
//
// Patch functions
async function addComment(userId: string, comment: Comment): Promise<Comment> {
  const newComment: Comment = { userId, ...comment };
  const user = await getUser(userId);
  user.comments.push(newComment);
  await writeDatabase(user);
  return newComment;
}

async function addPost(id: number, post: Post) {}

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

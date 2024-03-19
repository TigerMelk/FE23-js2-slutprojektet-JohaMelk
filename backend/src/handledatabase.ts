import fs from "fs/promises";
import { User, Comment, Post } from "./userType.js";
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
async function getUsers(): Promise<User> {
	const db = await readDatabase();
	const { users } = db;
	return users;
}
//! promise type fel
async function getUser(id: number): Promise<any> {
	const users = await getUsers();
	const user = users[0].find((user: User) => user.id == id);
	if (user) return user;
	else return { message: "user not found" };
}

async function addUser(user: User): Promise<User> {
	const newUser = { id: crypto.randomUUID(), ...user };
	const users = await getUsers();
	users[0].push(newUser);
	await writeDatabase(users);
	return newUser;
}
async function addComment(id: number, comment: Comment) {
	const newComment = { id: crypto.randomUUID(), ...comment };
	const user = await getUser(id);
	user.comments.push(newComment);
	await writeDatabase(user);
	return newComment;
}

async function addPost(id: number, post: Post) {}

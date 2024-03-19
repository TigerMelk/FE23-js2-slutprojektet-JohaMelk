import fs from "fs/promises";
import { User, Comment } from "./userType.js";
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
async function getUsers() {
	const db = await readDatabase();
	const { users } = db;
	return users;
}

async function getUser(id: number) {
	const users = await getUsers();
	const user = users[0].find((user: User) => user.id == id);
	if (user) return user;
	else return { message: "user not found" };
}

async function addUser() {}

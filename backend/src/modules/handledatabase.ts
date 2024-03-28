import fs from "fs/promises";
import { User } from "./Types.js";

//database read and write

// readme file
async function readDatabase() {
  const rawDbBuffer: Buffer = await fs.readFile("./src/storage/db.json");
  const rawDb: string = rawDbBuffer.toString("utf-8");
  return JSON.parse(rawDb);
}
async function writeDatabase(users: User[]): Promise<void> {
  const db = { users };
  await fs
    .writeFile("./src/storage/db.json", JSON.stringify(db, null, 2))
    .then(() => {
      console.log("database updated correctly");
    })
    .catch((error) => {
      console.error("error writing database", error);
    });
}

export { readDatabase, writeDatabase };

import express from "express";
import cors from "cors";
import * as db from "./handledatabase.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});

// app.get()
// app.post()
// app.put()
// app.patch()
// app.delete()

app.listen(3000, () => {
	console.log("listening to port 3000");
});

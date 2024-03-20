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

app.get("/api/:id?", (req, res) => {
  console.log("get req recieved");

  if (req.params.id) {
    db.getUser(parseInt(req.params.id)).then((user) => {
      if (user) res.json(user);
    });
  } else {
    db.getUsers().then((users) => {
      if (users) res.json(users);
    });
  }
});
// app.post()
// app.put()
// app.patch()
// app.delete()

app.listen(3000, () => {
  console.log("listening to port 3000");
});

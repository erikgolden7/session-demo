const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");

const { getPeople, addPerson } = require(`${__dirname}/controllers/peopleCtrl`);

const port = 3001;

const app = express();

app.use(cors());
app.use(json());

app.get("/api/people", getPeople);
app.post("/api/people", isAuthed, addPerson);

function isAuthed(req, res, next) {
  if (req.body.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Please Login" });
  }
}

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");

const { getPeople, addPerson } = require(`${__dirname}/controllers/peopleCtrl`);

const port = 3001;

const app = express();

app.use(cors());
app.use(json());
app.use(
  session({
    secret: "temp secret",
    // Checks the object to see if any changes were made, if not it will track the old version.
    resave: false,
    // Did they do anything with this session. If they did not then don't save the session(if false)
    saveUninitialized: false
  })
);

app.get("/api/people", getPeople);
app.post("/api/people", addPerson);

// REQUEST LEVEL MIDDLEWARE:
// function isAuthed(req, res, next) {
//   if (req.body.role === "admin") {
//     next();
//   } else {
//     res.status(401).json({ message: "Please Login" });
//   }
// }

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

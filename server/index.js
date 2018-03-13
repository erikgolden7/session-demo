require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");

const {
  getCart,
  addToCart,
  editCart,
  deleteItem
} = require(`${__dirname}/controllers/cartCtrl`);
const { getPeople, addPerson } = require(`${__dirname}/controllers/peopleCtrl`);

const port = 3001;

const app = express();

console.log(process.env.secret);

app.use(cors());
app.use(json());
app.use(
  session({
    secret: process.env.secret,
    // Checks the object to see if any changes were made, if not it will track the old version.
    resave: false,
    // Did they do anything with this session. If they did not then don't save the session(if false).
    saveUninitialized: false,
    cookie: {
      // Set cookie to expire in 2 weeks.
      maxAge: 14 * 24 * 60 * 60 * 1000
    }
  })
);

// Logger middleware
app.use((req, res, next) => {
  console.log("REQ.SESSION", req.session);
  next();
});
// Get request for people
app.get("/api/people", getPeople);
// Post to add a new person
app.post("/api/people", addPerson);
// This endpoint will destroy your session
app.post("/api/logout", (req, res) => {
  // callback does stuff after destroying session
  req.session.destroy(() => {
    // Redirect to home
    // res.redirect("http://localhost:3000");
    // Send status code and message
    res.status(200).json({ message: "Logout Complete" });
  });
});

app.get("api/cart", getCart);
app.post("api/cart", addToCart);

app.put("api/cart/:id", editCart);
app.delete("api/cart/:id", deleteItem);

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

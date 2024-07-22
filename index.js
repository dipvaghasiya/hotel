const express = require("express");
const app = express();
const db = require("./db.js");
const bodyParser = require("body-parser");
const personRoutes = require("./routes/personRoutes.js");
const menuRoutes = require("./routes/menuRoutes");
require("dotenv").config();
const passport = require("./auth.js");

app.use(bodyParser.json());

//middleware function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to ${req.originalUrl}`
  );
  next();
};
app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", function (req, res) {
  res.send("Hello World");
});

//use the routers
app.use("/person", localAuthMiddleware, personRoutes);

//use the router
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("listening on port 3000");
});

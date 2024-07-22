const express = require("express");
const app = express();
const db = require("./db.js");
const bodyParser = require("body-parser");
const personRoutes = require("./routes/personRoutes.js");
const menuRoutes = require("./routes/menuRoutes");
require("dotenv").config();

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

//use the routers
app.use("/person", personRoutes);

//use the router
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("listening on port 3000");
});

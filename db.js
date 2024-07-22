var mongoose = require("mongoose");
require("dotenv").config();

//define the mongodb connection url
const mongoURL = process.env.MONGODB_URL;

//set up mongodb url
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//get the default connection
//mongoose maintain a default connection object representingthe mongodb connection
const db = mongoose.connection;

//define event listeners for database connection
db.on("connected", () => {
  console.log("connected to mongodb server");
});

db.on("error", (err) => {
  console.log("mongodb connection error: " + err);
});

db.on("disconnected", () => {
  console.log("disconnected to mongodb server");
});

//export the database connection
module.exports = db;

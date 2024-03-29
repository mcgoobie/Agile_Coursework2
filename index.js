const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mysql = require("mysql");
const port = 5000;
const path = require("path");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "uGiveDb",
});

// connect to the db
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to the database.");
});
global.db = db;

app.use(bodyParser.urlencoded({ extended: true }));

// Custom routes
app.use("/css", express.static("css"));
app.use("/img", express.static("img"));
app.use("/fonts", express.static("fonts"));
app.use("/scripts", express.static("scripts"));
require("./routes/main")(app);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + "/public"));
app.listen(port, () => console.log(`uGive listening on port ${port}!`));

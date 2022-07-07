const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const port = 8089;
const path = require('path');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "uGiveDb"
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

require("./routes/main")(app);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + '/public'));
app.listen(port, () => console.log(`MySmartHome app listening on port ${port}!`));

const session = require("express-session");
// The main.js file of your application
module.exports = function (app) {
  app.use(
    session({
      secret: "secretkey",
      name: "uniqueSessionID",
      resave: true,
      saveUninitialized: false,
    })
  );

  // Route for Home Page
  app.get("/", function (req, res) {
    res.render("index.html", { user: req.session.currentUser });
  });

  // Route for Register Page
  app.get("/register", function (req, res) {
    res.render("register.html");
  });

  // Route for login Page
  app.get("/login", function (req, res) {
    res.render("login.html");
  });

  // Route for rewards page
  app.get("/rewards", function (req, res) {
    res.render("rewards.html");
  });

  app.post("/loginsuccess", function (req, res) {
    let sqlquery =
      "SELECT username FROM user WHERE username = ? AND password = ?";
    let loginDetails = [req.body.username, req.body.password];
    let username = req.body.username;

    let errorString = encodeURIComponent(
      "Your username/password appears to be invalid. Please try again."
    );

    db.query(sqlquery, loginDetails, (err, result) => {
      if (err || result == "") {
        res.redirect("/login?errorMsg=" + errorString);
      } else {
        req.session.currentUser = username;
        res.redirect("/");
      }
    });
  });

  app.post("/registered", function (req, res) {
    let sqlquery =
      "INSERT INTO user (userName, fName, lName, DoB, mobileNumber, emailAddr, address, postalCode, password) VALUES (?,?,?,?,?,?,?,?,?)";
    let newuser = [
      req.body.username,
      req.body.fname,
      req.body.lname,
      req.body.dob,
      req.body.mobilenum,
      req.body.email,
      req.body.address,
      req.body.postal,
      req.body.password,
    ];

    db.query(sqlquery, newuser, (err, result) => {
      if (err) {
        return console.error(err.message);
      } else {
        res.redirect("/login");
      }
    });
  });

  app.get("/maps", function (req, res) {
    res.render("maps.html");
  });

  app.post("/locatePoints", function (req, res) {
    let locationName = encodeURIComponent([req.body.donationPoint]);
    console.log(locationName);
    res.redirect("/maps?location=" + locationName);
  });

  app.get("/household-appliance-category", (req, res) => {
    let word = [req.query.categoryName];
    console.log(word);
    let sqlquery = "SELECT * FROM reward WHERE category like ?";
    // execute sql query
    db.query(sqlquery, word, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("category.html", {
        rewardProperty: result,
      });
    });
  });

  app.get("/voucher-coupon-category", (req, res) => {
    let word = [req.query.categoryName];
    console.log(word);
    let sqlquery = "SELECT * FROM reward WHERE category like ?";
    // execute sql query
    db.query(sqlquery, word, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("couponVouchercategory.html", {
        rewardProperty: result,
      });
    });
  });

  app.get("/voucher-coupon-category/search", (req, res) => {
    let word = [req.query.searchValue];
    console.log(word);
    let sqlquery = `SELECT * FROM reward WHERE rewardName like ? AND category = 'couponVoucher'`;
    // execute sql query
    db.query(sqlquery, word, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      console.log(result);
      res.render("couponVouchercategory.html", {
        rewardProperty: result,
      });
    });
  });
};

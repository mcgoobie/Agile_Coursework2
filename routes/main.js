const nodemailer = require("nodemailer");
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
  
  // Route for About Page
  app.get("/about", (req, res) => {
    // execute sql query
    res.render("about.html");
  });

  // Route for Register Page
  app.get("/register", function (req, res) {
    res.render("register.html");
  });

  // Route for Register Page
  app.get("/failedRegistration", function (req, res) {
    res.render("regFailed.html");
  });

  // Route for login Page
  app.get("/login", function (req, res) {
    res.render("login.html");
  });

  // Route for logout
  app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  });

  // Route for forgetPassword Page
  app.get("/forgetPassword", function (req, res) {
    res.render("forgetpassword.html", { user: req.session.currentUser });
  });

  app.post("/sendNewPassword", function (req, res) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "uGive_support_team@gmail.com",
        pass: "123456",
      },
    });

    var mailOptions = {
      // Won't work, need to set up business account for gmail to proceed, i no money :c .
      from: '"The uGive Team" <uGivecontact@gmail.com>',
      to: req.body.email,
      subject: "uGive Account Password Reset",
      text: "Hello! We noticed a request to change your uGive password, as such we are sending you your password here! Please try to remember it :)",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send("Email sent.");
  });

  // Route for rewards page
  app.get("/rewards", function (req, res) {
    res.render("rewards.html", { user: req.session.currentUser });
  });

  // Route for rewards page
  app.get("/editprofile", function (req, res) {
    let sqlquery =
      "SELECT fName, lName, DoB, mobileNumber, emailAddr, address, postalCode FROM user WHERE username = ?";
    let currentUser = [req.session.currentUser];

    db.query(sqlquery, currentUser, (err, result) => {
      if (err || result == "") {
        res.redirect("/");
      } else {
        res.render("editprofile.html", {
          user: req.session.currentUser,
          profileInfo: result,
        });
      }
    });
  });

  app.post("/editprofile", function (req, res) {
    let sqlquery =
      "UPDATE user SET fName = ?, lName = ?, mobileNumber = ?, emailAddr = ?, address = ?, postalCode = ? WHERE userName = ?";
    let updatedProfile = [
      req.body.fName,
      req.body.lName,
      req.body.mobileNumber,
      req.body.emailAddr,
      req.body.address,
      req.body.postalCode,
      req.session.currentUser,
    ];

    db.query(sqlquery, updatedProfile, (err, result) => {
      if (err || result == "") {
        return console.error(err.message);
      } else {
        let sqlquery =
          "SELECT fName, lName, DoB, mobileNumber, emailAddr, address, postalCode FROM user WHERE username = ?";
        let currentUser = [req.session.currentUser];

        db.query(sqlquery, currentUser, (err, result) => {
          res.render("editprofile.html", {
            user: req.session.currentUser,
            profileInfo: result,
          });
        });
      }
    });
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
        res.redirect("/failedRegistration");
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

  app.get("/blog", function (req, res) {
    res.render("blog.html", { user: req.session.currentUser });
  });

  app.get("/article", function (req, res) {
    res.render("article.html", { user: req.session.currentUser });
  });

  app.get("/schedule", function (req, res) {
    let sqlquery =
      "SELECT  userId, mobileNumber, emailAddr, address, postalCode FROM user WHERE username = ?";
    let currentUser = [req.session.currentUser];

    db.query(sqlquery, currentUser, (err, result) => {
      if (err || result == "") {
        res.redirect("/");
      } else {
        res.render("booking.html", {
          user: req.session.currentUser,
          userDetails: result,
        });
      }
    });
  });

  app.post("/bookingsuccess", function (req, res) {
    let sqlquery =
      "INSERT INTO booking (userId, date, time, donationType1, donationDesc1, donationType2, donationDesc2, donationType3, donationDesc3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let newBooking = [
      req.body.userId,
      req.body.date,
      req.body.time,
      req.body.itemType1,
      req.body.itemDesc1,
      req.body.itemType2,
      req.body.itemDesc2,
      req.body.itemType3,
      req.body.itemDesc3,
    ];

    db.query(sqlquery, newBooking, (err, result) => {
      if (err || result == "") {
        return console.error(err.message);
      } else {
        res.render("success.html", { user: req.session.currentUser });
      }
    });
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
      res.render("homeApplianceCategory.html", {
        rewardProperty: result,
      });
    });
  });

  app.get("/household-appliance-category/search", (req, res) => {
    let word = [req.query.searchValue];
    console.log(word);
    let sqlquery = `SELECT * FROM reward WHERE rewardName like ? AND category = 'householdAppliance'`;
    // execute sql query
    db.query(sqlquery, word, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      console.log(result);
      res.render("homeApplianceCategory.html", {
        rewardProperty: result,
      });
    });
  });

  app.get("/household-appliance-category/details", (req, res) => {
    let word = [req.query.name];
    console.log(word);
    let sqlquery = "SELECT * FROM reward WHERE rewardName like ?";
    // execute sql query
    db.query(sqlquery, word, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("itemDetails.html", {
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

  app.get("/voucher-coupon-category/details", (req, res) => {
    let word = [req.query.name];
    console.log(word);
    let sqlquery = "SELECT * FROM reward WHERE rewardName like ?";
    // execute sql query
    db.query(sqlquery, word, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("itemDetails.html", {
        rewardProperty: result,
      });
    });
  });

  app.get("/fashion-category", (req, res) => {
    let word = [req.query.categoryName];
    console.log(word);
    let sqlquery = "SELECT * FROM reward WHERE category like ?";
    // execute sql query
    db.query(sqlquery, word, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("fashionCategory.html", {
        rewardProperty: result,
      });
    });
  });

  app.get("/fashion-category/search", (req, res) => {
    let word = [req.query.searchValue];
    console.log(word);
    let sqlquery = `SELECT * FROM reward WHERE rewardName like ? AND category = 'fashion'`;
    // execute sql query
    db.query(sqlquery, word, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      console.log(result);
      res.render("fashionCategory.html", {
        rewardProperty: result,
      });
    });
  });

  app.get("/fashion-category/details", (req, res) => {
    let word = [req.query.name];
    console.log(word);
    let sqlquery = "SELECT * FROM reward WHERE rewardName like ?";
    // execute sql query
    db.query(sqlquery, word, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("itemDetails.html", {
        rewardProperty: result,
      });
    });
  });

  app.get("/view-booking", (req, res) => {
    let sqlquery = "SELECT b.* FROM booking b JOIN user u ON (b.userId = u.userId) WHERE u.username = ?";
    let user = [req.session.currentUser];
    // execute sql query
    db.query(sqlquery, user, (err, result) => {
      if (err || result == "") {
        res.redirect("/");
        return console.error(err.message);
      } else {
      res.render("viewBookings.html",
        {
          user: req.session.currentUser,
          bookings: result,
        });
      }
    });
  });
};

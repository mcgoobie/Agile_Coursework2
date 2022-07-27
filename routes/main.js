const session = require('express-session');
const nodemailer = require('nodemailer');
// The main.js file of your application
module.exports = function (app) {

  app.use(session({
    secret: 'secretkey',
    name: 'uniqueSessionID',
    resave: true,
    saveUninitialized: false
  }))

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

  // Route for forgetPassword Page
  app.get("/forgetPassword", function (req, res) {
    res.render("forgetpassword.html", { user: req.session.currentUser });
  });

  app.post("/sendNewPassword", function(req, res) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'owenleeweihern@gmail.com',
        pass: 'Weihern207$'
      }
    });
  
    var mailOptions = {
      // Won't work, need to set up business account for gmail to proceed, i no money :c .
      from: '"The uGive Team" <uGivecontact@gmail.com>',
      to: req.body.email,
      subject: 'uGive Account Password Reset',
      text: 'Hello! We noticed a request to change your uGive password, as such we are sending you your password here! Please try to remember it :)'
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.send("Email sent.");
  });

  // Route for rewards page
  app.get("/rewards", function (req, res) {
    res.render("rewards.html");
  });

  // Route for rewards page
  app.get("/editprofile", function (req, res) {
    let sqlquery = "SELECT fName, lName, DoB, mobileNumber, emailAddr, address, postalCode FROM user WHERE username = ?";
    let currentUser = [req.session.currentUser];

    db.query(sqlquery, currentUser, (err, result) => {
      if (err || result == '') {
        res.redirect("/");
      } else {
        res.render("editprofile.html", { user: req.session.currentUser, profileInfo: result });
      }
    });
  });

  app.post("/editprofile", function (req, res) {
    let sqlquery = "UPDATE user SET fName = ?, lName = ?, mobileNumber = ?, emailAddr = ?, address = ?, postalCode = ? WHERE userName = ?"
    let updatedProfile = [req.body.fName, req.body.lName, req.body.mobileNumber, req.body.emailAddr, req.body.address, req.body.postalCode, req.session.currentUser];

    db.query(sqlquery, updatedProfile, (err, result) => {
      if (err || result == '') {
        return console.error(err.message);
      } else {
        let sqlquery = "SELECT fName, lName, DoB, mobileNumber, emailAddr, address, postalCode FROM user WHERE username = ?";
        let currentUser = [req.session.currentUser];

        db.query(sqlquery, currentUser, (err, result) => {
            res.render("editprofile.html", { user: req.session.currentUser, profileInfo: result });
        });
      }
    });
  });

  app.post("/loginsuccess", function (req, res) {
    let sqlquery = "SELECT username FROM user WHERE username = ? AND password = ?";
    let loginDetails = [req.body.username, req.body.password];
    let username = req.body.username;

    let errorString = encodeURIComponent('Your username/password appears to be invalid. Please try again.');

    db.query(sqlquery, loginDetails, (err, result) => {
      if (err || result == '') {
        res.redirect("/login?errorMsg=" + errorString);
      } else {
        req.session.currentUser = username;
        res.redirect("/");
      }
    });
  });

  app.post("/registered", function (req, res) {
    let sqlquery = "INSERT INTO user (userName, fName, lName, DoB, mobileNumber, emailAddr, address, postalCode, password) VALUES (?,?,?,?,?,?,?,?,?)";
    let newuser = [req.body.username, req.body.fname, req.body.lname, req.body.dob, req.body.mobilenum, req.body.email, req.body.address, req.body.postal, req.body.password];

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
  })

  app.post("/locatePoints", function (req, res) {
    let locationName = encodeURIComponent([req.body.donationPoint]);
    console.log(locationName);
    res.redirect("/maps?location=" + locationName);
  });
}

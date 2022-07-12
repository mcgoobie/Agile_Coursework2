// The main.js file of your application
module.exports = function (app) {
  // Route for Home Page
  app.get("/", function (req, res) {
    res.render("index.html");
  });

  // Route for Register Page
  app.get("/register", function (req, res) {
    res.render("register.html");
  });

  // Route for login Page
  app.get("/login", function (req, res) {
    res.render("login.html");
  });

  // app.post("/loginsuccess", function (req, res) {
  //   let sqlquery =
  //     "SELECT username FROM user WHERE username = ? AND password = ?";
  //   let loginDetails = [req.body.username, req.body.password];

  //   db.query(sqlquery, loginDetails, (err, result) => {
  //     if (err) {
  //       return console.error(err.message);
  //     } else {
  //       res.redirect("/");
  //     }
  //   });
  // });

  // app.post("/registered", function (req, res) {
  //   let sqlquery =
  //     "INSERT INTO user (userName, fName, lName, DoB, mobileNumber, emailAddr, address, postalCode, password) VALUES (?,?,?,?,?,?,?,?,?)";
  //   let newuser = [
  //     req.body.username,
  //     req.body.fname,
  //     req.body.lname,
  //     req.body.dob,
  //     req.body.mobilenum,
  //     req.body.email,
  //     req.body.address,
  //     req.body.postal,
  //     req.body.password,
  //   ];

  //   db.query(sqlquery, newuser, (err, result) => {
  //     if (err) {
  //       return console.error(err.message);
  //     } else {
  //       res.redirect("/login");
  //     }
  //   });
  // });
};

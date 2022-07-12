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

}
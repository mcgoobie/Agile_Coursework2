// The main.js file of your application
module.exports = function (app) {

  // Route for Home Page
  app.get("/", function (req, res) {
    res.render("index.html");
  });

}
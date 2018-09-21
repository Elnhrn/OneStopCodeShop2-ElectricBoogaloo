var path = require("path");

module.exports = function(app) {
  // HTML ROUTE OVERVIEW
  // Welcome page - Main landing page for forum
  app.get("/login", function(req, res) {
    res.render("login", {
      title: "Form Validation",
      success: req.session.success,
      errors: req.session.errors
    });
    req.session.errors = null;
  });

  app.post("/login", function(req, res) {
    req.check("email", "Invalid email address").isEmail();
    req
      .check("password", "Password is invalid")
      .isLength({
        min: 4
      })
      .equals(req.body.confirmPassword);
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
    } else {
      req.session.success = true;
    }
    res.redirect("/");
  });

  app.get("/", function(req, res) {
    if (req.session.success) {
      res.render("index");
    } else {
      res.render("login");
    }
  });

  app.get("/createAccount", function(req, res) {
    res.render("createAccount");
  });

  app.post("/submit", function(req, res) {
    req.check("email", "Invalid email address").isEmail();
    req
      .check("password", "Password is invalid")
      .isLength({
        min: 4
      })
      .equals(req.body.confirmPassword);
    var errors = req.validationErrors();
    if (errors) {
      req.session.errors = errors;
      req.session.success = false;
    } else {
      req.session.success = true;
    }
    res.redirect("/");
  });

  app.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/login");
  });

  // Category page - Page listing all posts for a specific category (ex. HTML category)
  app.get("/category", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/category.html"));
  });
  // Individual Post page - Page with original post and all comments
  app.get("/post", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/post.html"));
  });
  // Create Post page - Page to create a forum post
  app.get("/create", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/create.html"));
  });
};

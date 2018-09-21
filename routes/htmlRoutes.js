module.exports = function(app) {
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
      res.redirect("/");
    }
  });

  app.get("/", function(req, res) {
    if (req.session.success) {
      res.render("index");
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
};

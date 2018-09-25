var db = require("../models");

function isUniqueUser(user) {
  return db.Users.count({
    where: {
      username: user
    }
  }).then(function(count) {
    if (count != 0) {
      return false;
    }
    return true;
  });
}

module.exports = function(app) {

  // LOGIN ROUTES
  app.get("/login", function(req, res) {
    if (req.session.success) {
      res.redirect("/account");
    } else {
      res.render("login/index", {
        msg: "Sorry, we couldn't locate your account.",
        title: "Form Validation",
        success: req.session.success,
        errors: req.session.errors
      });
      req.session.errors = null;
    }
  });

  app.post("/login", function(req, res) {
    db.Users.findOne({
      where: {
        user_name: req.body.username
      }
    })
      .then(function(user) {
        req
          .check("password", "Password is invalid")
          .isLength({
            min: 4
          })
          .equals(user.user_pass);
        var errors = req.validationErrors();
        if (errors) {
          req.session.errors = errors;
          req.session.success = false;
          res.redirect("/login");
        } else {
          req.session.user = user;
          req.session.success = true;
          res.redirect("/forum");
        }
      })
      .catch(function(err) {
        req.session.errors = err;
        res.redirect("/login");
      });
  });

  // CREATE ACCOUNT ROUTES
  app.get("/register", function(req, res) {
    res.render("register/index", {
      title: "Form Validation",
      success: req.session.success,
      errors: req.session.errors
    });
    req.session.errors = null;
  });

  app.post("/register", function(req, res) {
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
      res.redirect("/register");
    } else {
      db.Users.create({
        user_firstName: req.body.firstName,
        user_lastName: req.body.lastName,
        user_name: req.body.username,
        user_pass: req.body.password,
        user_level: 0
      }).then(function(user) {
        req.session.user = user;
        req.session.success = true;
        res.redirect("/forum");
      });
    }
  });
};

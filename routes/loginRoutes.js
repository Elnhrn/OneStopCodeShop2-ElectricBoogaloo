var db = require("../models");
var validator = require("express-validator");


module.exports = function(app) {

  // Create custom validator to check if the username is being used in database
  app.use(
    validator({
    customValidators: {
      isUsernameAvailable: function(username) {
        return db.Users.count({
            where: {
              user_name: username
            }
          }).then(function(count) {
          if (count != 0) {
              return error;
          } else {
              return true;
          }
          });
      }
    }
    })
  );

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
    // Find user in database
    db.Users.findOne({
      where: {
        user_name: req.body.username
      }
    })
      .then(function(user) {
        // Validate the password
        req
          .check("password", "Password is invalid")
          .isLength({
            min: 4
          })
          .equals(user.user_pass);
        var errors = req.validationErrors();
        // If errors, redirect and display error messages
        if (errors) {
          req.session.errors = errors;
          req.session.success = false;
          res.redirect("/login");
        }
        // If not, set the session user and redirect to forum page
        else {
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

  // REGISTER ROUTES
  app.get("/register", function(req, res) {
    res.render("register/index", {
      title: "Form Validation",
      success: req.session.success,
      errors: req.session.errors
    });
    // Set session error to null so error messages do not repeat
    req.session.errors = null;
  });

  app.post("/register", function(req, res) {
    // Check if all fields are empty
    req.checkBody({
      firstName: {
        notEmpty: true,
        errorMessage: "First name is required"
      },
      lastName: {
        notEmpty: true,
        errorMessage: "Last name is required"
      },
      username: {
        notEmpty: true,
        errorMessage: "Username is required"
      },
      password: {
        notEmpty: true,
        errorMessage: "Password is required"
      },
      confirmPassword: {
        notEmpty: true,
        errorMessage: "Password Confirmation is required"
      }
    });
    // Check if username is already taken
    req
      .check("username", "This username is already taken")
      .isUsernameAvailable(req.body.username);
    // Check if password is valid
    req
      .check("password", "Password should be longer than 4 characters")
      .isLength({ min: 4 })
      .equals(req.body.confirmPassword);
    // Catch any validation errors
    req
      .asyncValidationErrors()
      .then(function() {
        // If successful, push values to the database
        db.Users.create({
          user_firstName: req.body.firstName,
          user_lastName: req.body.lastName,
          user_name: req.body.username,
          user_pass: req.body.password,
          user_level: 0
        }).then(function(user) {
          // Reroute to forum page
          req.session.user = user;
          req.session.success = true;
          res.redirect("/forum");
        });
      })
      // Catch the errors and redirect back to page with error messages
      .catch(function(errors) {
        if (errors) {
          req.session.errors = errors;
          req.session.success = false;
          res.redirect("/register");
        }
      });

  });
};

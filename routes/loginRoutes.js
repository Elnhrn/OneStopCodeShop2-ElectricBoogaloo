var db = require("../models");
var validator = require("express-validator");

// Function to check if the entered username is unique
function isUniqueUser(user) {
  return db.Users.count({
    where: {
      user_name: user
    }
  }).then(function(count) {
    if (count != 0) {
      return false;
    }
    return true;
  });
}

module.exports = function(app) {

  app.use(validator({
      customValidators: {
        isUsernameAvailable: function(username) {
            return db.Users.count({
                where: {
                  user_name: username
                }
              }).then(function(count) {
                if (count != 0) {
                  return false;
                }
                return true;
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
    // var newUsername = req.body.username;
    // isUniqueUser(newUsername).then(function(isUnique) {
    //   if(isUnique) {
    req.checkBody({
      "firstName": {
        notEmpty: true,
        errorMessage: "First name is required"
      },
      "lastName": {
        notEmpty: true,
        errorMessage: "Last name is required"
      },
      "username": {
        notEmpty: true,
        errorMessage: "Username is required"
      },
      "password": {
        notEmpty: true,
        errorMessage: "Password is required"
        // isLength: {
        //   min: 4,
        //   errorMessage: "Password should be longer than 4 characters"
        // },
        // equals: req.body.confirmPassword
      },
      "confirmPassword": {
        notEmpty: true,
        errorMessage: "Password Confirmation is required"
      }
    });
    req.check("username", "This username is already taken")
      .isUsernameAvailable(req.body.username);
    req.check("password", "Password should be longer than 4 characters").isLength({min:4}).equals(req.body.confirmPassword)
    req.asyncValidationErrors().then(function() {
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
    }).catch(function(errors) {
      if(errors) {
          req.session.errors = errors;
          req.session.success = false;
          res.redirect("/register");
      }
      });

    // if (errors) {

    //     }
    //   } else {
    //     req.session.errors = "Sorry, this username is taken!";
    //     res.redirect("/register");
  });
  //   });
};

var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index", {
      msg: "Welcome to the electric boogaloo!",
      success: req.session.success
    });
  });

  // Load example page and pass in an example by id
  // LOGIN ROUTES
  app.get("/login", function(req, res) {
    if (req.session.success) {
      res.redirect("/account");
    } else {
      res.render("login/index", {
        msg: "Welcome back/Create new?",
        title: "Form Validation",
        success: req.session.success,
        errors: req.session.errors
      });
      req.session.errors = null;
    }
  });

  app.post("/login", function (req, res) {
    db.Users.findOne({
      where: {
        user_name: req.body.username
      }
    }).then(function (user) {
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
        req.session.username = user.user_name;
        req.session.success = true;
        res.redirect("/forum");
      }
    }).catch(function(err) {
      req.session.errors = err;
      res.redirect("/login");
    });
  });

  // CREATE ACCOUNT ROUTES
  app.get("/register", function (req, res) {
    res.render("register/index", {
      title: "Form Validation",
      success: req.session.success,
      errors: req.session.errors
    });
    req.session.errors = null;
  });

  app.post("/register", function (req, res) {
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
      }).then(function () {
        req.session.success = true;
        res.redirect("/forum");
      });
    }
  });

  app.get("/forum", function (req, res) {
    if (req.session.success) {
      db.Topics.findAll({}).then(function (dbTopics) {
        db.Posts.findAll({}).then(function (dbPosts) {
          res.render("forum/index", {
            msg: "Welcome to the forum!",
            topics: dbTopics,
            posts: dbPosts,
            session: req.session.success
          });
          // db.Posts.findAll({}).then(function(dbPosts) {
          //   res.render("forum/index", {
          //     posts: dbPosts
          //   });
        });
      });
    } else {
      res.redirect("/login");
    }
  });

  // app.put("/forum", function (req, res) {
  //   if (req.session.success) {
  //     db.Posts.findAll({}).then(function (dbPosts) {
  //       res.render("forum/index", {
  //         msg: "Welcome to the forum!",
  //         posts: dbPosts,
  //         session: req.session.success
  //       });
  //     });
  //   } else {
  //     res.redirect("/login");
  //   }
  //   req.session.errors = null;
  // });

  app.get("/account", function (req, res) {
    if (req.session.success) {
      db.Users.findOne({}).then(function (dbUsers) {
        res.render("myAccount/index", {
          users: dbUsers,
          success: req.session.success,
          username: req.session.username
        });
      });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/topics", function (req, res) {
    if (req.session.success) {
      db.Topics.findAll({}).then(function (dbTopics) {
        res.render("topics/index", {
          topics: dbTopics,
          success: req.session.success
        });
      });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/author", function (req, res) {
    if (req.session.success) {
      db.Posts.findAll({}).then(function (dbPosts) {
        res.render("author/index", {
          author: dbPosts,
          success: req.session.success
        });
      });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/posts", function (req, res) {
    if (req.session.success) {
      db.Posts.findAll({}).then(function (dbPosts) {
        res.render("posts/index", {
          posts: dbPosts,
          success: req.session.success
        });
      });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/add-a-post", function (req, res) {
    if (req.session.success) {
      // db.Posts.create({}).then(function(dbPosts) {
      res.render("createPost/index", {
        //     newPost: dbPosts
        //   });
      });
    } else {
      res.redirect("/login");
    }
  });
  // });

  app.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/");
  });
};

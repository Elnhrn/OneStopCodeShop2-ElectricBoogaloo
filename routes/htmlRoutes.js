var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {
      msg: "Welcome to the electric boogaloo!",
      success: req.session.success
    });
  });

  app.get("/forum", function(req, res) {
    if (req.session.success) {
      db.Topics.findAll({}).then(function(dbTopics) {
        // COME BACK TO THIS
        db.Posts.findAll({ order: [["post_rating", "ASC"]], limit: 5 }).then(function (dbPosts) {
          // db.Users.findOne({}).then(function(dbUser) {
          res.render("forum/index", {
            currentUser: req.session.user,
            msg: "Welcome to the forum!",
            topics: dbTopics,
            // user: dbUser,
            posts: dbPosts,
            success: req.session.success
          // });
        });
      });
    });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/account/:id", function(req, res) {
    if (req.session.success) {
      db.Users.findOne({ where: { id: req.params.id } }).then(function(dbUsers) {
        db.Posts.findAll({ where: { UserId: req.params.id } }).then(function(dbPosts) {
          db.Replies.findAll({ where: { UserId: req.params.id } }).then(function(dbReplies) {
            res.render("myAccount/index", {
              currentUser: req.session.user,
              users: dbUsers,
              userPosts: dbPosts,
              userReplies: dbReplies,
              success: req.session.success
            });
          });
        });
      });
    } else {
      res.redirect("/login");
    }
  });

  // do we need this?
  app.get("/topics/:id", function(req, res) {
    if (req.session.success) {
      db.Topics.findOne({ where: { id: req.params.id } }).then(function(
        dbTopics
      ) {
        db.Posts.findAll({ where: { TopicID: req.params.id } }).then(function(
          dbPosts
        ) {
          // COME BACK TO THIS
          db.Posts.findAll({ order: [["post_rating", "ASC"]], limit: 5 }).then(
            function(dbPosts2) {
              res.render("topics/index", {
                currentUser: req.session.user,
                topics: dbTopics,
                posts2: dbPosts2,
                posts: dbPosts,
                success: req.session.success
              });
            }
          );
        });
      });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/users/:id", function(req, res) {
    if (req.session.success) {
      db.Users.findOne({ where: { id: req.params.id } }).then(function(
        dbUsers
      ) {
        db.Posts.findAll({ where: { UserId: req.params.id } }).then(function(
          dbPosts
        ) {
          db.Replies.findAll({ where: { UserId: req.params.id } }).then(
            function(dbReplies) {
              res.render("author/index", {
                currentUser: req.session.user,
                user: dbUsers,
                userPosts: dbPosts,
                userReplies: dbReplies,
                success: req.session.success
              });
            }
          );
        });
      });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/posts", function(req, res) {
    if (req.session.success) {
      db.Posts.findAll({}).then(function(dbPosts2) {
        // COME BACK TO THIS
        db.Posts.findAll({ order: [["post_rating", "ASC"]], limit: 5 }).then(
          function(dbPosts) {
            res.render("posts/index", {
              currentUser: req.session.user,
              posts2: dbPosts2,
              posts: dbPosts,
              success: req.session.success
            });
          }
        );
      });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/posts/:id", function(req, res) {
    if (req.session.success) {
      db.Posts.findOne({ where: { id: req.params.id } }).then(function(
        dbPosts2
      ) {
        db.Replies.findAll({ where: { PostId: req.params.id } }).then(function(
          dbReplies
        ) {
          // COME BACK TO THIS
          db.Posts.findAll({ order: [["post_rating", "ASC"]], limit: 5 }).then(
            function(dbPosts) {
              res.render("this-post/index", {
                currentUser: req.session.user,
                posts2: dbPosts2,
                posts: dbPosts,
                replies: dbReplies,
                success: req.session.success
              });
            }
          );
        });
      });
    } else {
      res.redirect("/login");
    }
  });;

  app.get("/add-a-post", function(req, res) {
    if (req.session.success) {
      // db.Posts.create({}).then(function(dbPosts) {
      db.Posts.findAll({ order: [["post_rating", "ASC"]], limit: 5 }).then(function (dbPosts) {
        res.render("createPost/index", {
          posts: dbPosts,
          success: req.session.success
        });
      });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/");
  });
};

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
    req.params.id = req.session.id;
    if (req.session.success) {
      db.Users.findOne({ where: { id: req.params.id } }).then(function(dbUsers) {
        db.Posts.findAll({ where: { UserId: req.params.id } }).then(function(dbPosts) {
          db.Replies.findAll({ where: { UserId: req.params.id } }).then(function(dbReplies) {
            res.render("myAccount/index", {
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

  // app.get("/posts", function (req, res) {
  //   if (req.session.success) {
  //     db.Posts.findAll({}).then(function (dbPosts2) {
  //       // COME BACK TO THIS
  //       db.Posts.findAll({ order: [["post_rating", "ASC"]], limit: 5 }).then(function (dbPosts) {
  //         res.render("posts/index", {
  //           posts2: dbPosts2,
  //           posts: dbPosts,
  //           success: req.session.success
  //         });
  //       });
  //     });
  //   } else {
  //     res.redirect("/login");
  //   }
  // });

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

  app.post("/add-a-post", function (req, res) {

    // NEED TO FIX USER ID
    db.Posts.create({
      post_subject: req.body.post_title,
      post_body: req.body.post_body,
      post_rating: "0",
      post_number: "0",
      UserId: 1,
      TopicId: req.body.topic_name
    }).then(function () {
      console.log("did this post?")
      // res.redirect("/posts/" + this.id);
      res.redirect("/forum");
    });
  });

  app.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/");
  });
};

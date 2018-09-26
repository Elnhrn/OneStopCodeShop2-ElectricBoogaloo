var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index", {
      msg: "Welcome to the electric boogaloo!",
      success: req.session.success,
      currentUser: req.session.user
    });
  });

  app.get("/forum", function (req, res) {
    if (req.session.success) {
      // COME BACK TO THIS
      db.Posts.findAll({ order: [["post_rating", "ASC"]], limit: 5 }).then(function (dbPosts) {
        db.Topics.findAll({}).then(function (dbTopics) {
          res.render("forum/index", {
            currentUser: req.session.user,
            msg: "Welcome to the forum!",
            title: "Forum",
            topics: dbTopics,
            posts: dbPosts,
            success: req.session.success
          });
        });
      });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/account/:id", function (req, res) {
    if (req.session.success) {
      db.Users.findOne({ where: { id: req.params.id } }).then(function (dbUsers) {
        db.Posts.findAll({ where: { UserId: req.params.id } }).then(function (dbPosts) {
          db.Replies.findAll({ where: { UserId: req.params.id } }).then(function (dbReplies) {
            res.render("myAccount/index", {
              currentUser: req.session.user,
              users: dbUsers,
              title: "My Account",
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

  app.get("/topics/:id", function (req, res) {
    if (req.session.success) {
      // COME BACK TO THIS
      db.Posts.findAll({ order: [["post_number", "ASC"]], limit: 5 }).then(
        function (dbPosts) {
          db.Topics.findOne({ where: { id: req.params.id } }).then(function (
            dbTopics
          ) {
            db.Posts.findAll({ where: { TopicID: req.params.id } }).then(function (
              dbPosts2
            ) {
              res.render("topics/index", {
                currentUser: req.session.user,
                title: dbTopics.topic_name,
                posts2: dbPosts2,
                topics: dbTopics,
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

  app.get("/users/:id", function (req, res) {
    if (req.session.success) {
      db.Users.findOne({ where: { id: req.params.id } }).then(function (
        dbUsers
      ) {
        db.Posts.findAll({ where: { UserId: req.params.id } }).then(function (
          dbPosts
        ) {
          db.Replies.findAll({ where: { UserId: req.params.id } }).then(
            function (dbReplies) {
              res.render("author/index", {
                currentUser: req.session.user,
                title: dbUsers.user_name,
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

  app.get("/posts/:id", function (req, res) {
    if (req.session.success) {
      // COME BACK TO THIS
      db.Posts.findAll({ order: [["post_rating", "ASC"]], limit: 5 }).then(
        function (dbPosts) {
          db.Posts.findOne({ where: { id: req.params.id } }).then(function (
            dbPosts2
          ) {
            db.Replies.findAll({ where: { PostId: req.params.id } }).then(function (
              dbReplies
            ) {

              res.render("this-post/index", {
                currentUser: req.session.user,
                title: dbPosts2.post_subject,
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
  });

  app.post("/posts/:id", function (req, res) {

    let currentUser = req.session.user;
    let postId = req.params.id

    // NEED TO REFERENCE POST ID
    db.Replies.create({
      reply_content: req.body.replyBody,
      reply_rating: 0,
      PostId: postId,
      UserId: currentUser.id
    }).then(function (result) {
      res.redirect("/posts/" + result.PostId)
    })
  });

  app.get("/add-a-post", function (req, res) {

// add updates to replies, post and topics here. the incrementing of post/reply numbers

    if (req.session.success) {
      // COME BACK TO THIS
      db.Posts.findAll({ order: [["post_rating", "ASC"]], limit: 5 }).then(function (dbPosts) {
        res.render("createPost/index", {
          currentUser: req.session.user,
          title: "Make A Post",
          posts: dbPosts,
          success: req.session.success
        });
      });
    } else {
      res.redirect("/login");
    }
  });

  app.post("/add-a-post", function (req, res) {

    let currentUser = req.session.user;
    db.Posts.create({
      post_subject: req.body.post_title,
      post_body: req.body.post_body,
      post_rating: 0,
      post_number: 0,
      UserId: currentUser.id,
      TopicId: req.body.topic_name
    }).then(function (result) {
      res.redirect("/posts/" + result.id);
    });
  });

  app.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/");
  });
};

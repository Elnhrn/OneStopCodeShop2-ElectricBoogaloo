// 1. home page
// 2. login/register
// 3. my account
// 4. by category/topic
// 5. by author
// 6. by post
// 7. create post

var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {
      msg: "Welcome to the electric boogaloo!"
    });
  });

  // Load example page and pass in an example by id
  app.get("/login", function(req, res) {
    res.render("login/index", {
      msg: "Welcome back/Create new?"
    });
  });

  app.get("/account", function(req, res) {
    db.Users.findOne({}).then(function(dbUsers) {
      res.render("myAccount/index", {
        users: dbUsers
      });
    });
  });

  app.get("/topics", function(req, res) {
    db.Topics.findAll({}).then(function(dbTopics) {
      res.render("topics/index", {
        topics: dbTopics
      });
    });
  });

  app.get("/author", function(req, res) {
    db.Posts.findAll({}).then(function(dbPosts) {
      res.render("author/index", {
        author: dbPosts
      });
    });
  });

  app.get("/posts", function(req, res) {
    db.Posts.findAll({}).then(function(dbPosts) {
      res.render("posts/index", {
        posts: dbPosts
      });
    });
  });

  app.get("/add-a-post", function(req, res) {
    db.Posts.create({}).then(function(dbPosts) {
      res.render("createPost/index", {
        newPost: dbPosts
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

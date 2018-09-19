var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbForum) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbForum
      });
    });
  });

  // THIS WORKS TOO!!!!!!!!!!!
  // Load example page and pass in an example by id
  // app.get("/forum", function(req, res) {
  //   db.Forum.findAll({}).then(function(dbForum) {
  //     res.render("example", {
  //       forum: dbForum
  //     });
  //   });
  // });

  // app.get("/forum", function(req, res) {
  //   db.Topics.findAll({}).then(function(dbTopics) {
  //     res.render("example", {
  //       forum: dbTopics
  //     });
  //   });
  // });

  // THIS WORKS
  // app.get("/forum", function(req, res) {
  //   db.Users.findAll({}).then(function(dbUsers) {
  //     console.log("did i run?")
  //     console.log(dbUsers)
  //     res.render("example", {
  //       forum: dbUsers
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

// var path = require("path");

// module.exports = function(app) {
//   // HTML ROUTE OVERVIEW
//   // Welcome page - Main landing page for forum
//   app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/index.html"));
//   });
//   // Category page - Page listing all posts for a specific category (ex. HTML category)
//   app.get("/category", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/category.html"));
//   });
//   // Individual Post page - Page with original post and all comments
//   app.get("/post", function(req, res) {
//     res.sendFile(path.join(__dirname, "../views/layouts/main.handlebars"));
//   });
//   // Create Post page - Page to create a forum post
//   app.get("/create", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/create.html"));
//   });
// };

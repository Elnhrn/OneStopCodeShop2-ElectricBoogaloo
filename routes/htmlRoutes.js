var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

// HTML ROUTE OVERVIEW
  // Welcome page - Main landing page for forum
    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/blog.html"));
    });
  // Category page - Page listing all posts for a specific category (ex. HTML category)
    app.get("/category", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/cms.html"));
    });
  // Individual Post page - Page with original post and all comments
    app.get("/post", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/blog.html"));
    });
  // Create Post page - Page to create a forum post
    app.get("/create", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/blog.html"));
    });
var db = require("../models");

module.exports = function(app) {
  // API ROUTING OVERVIEW
  // Welcome page - Main landing page for forum
  // GET for recent posts
  app.get("/api/posts/", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  // Category page - Page listing all posts for a specific category (ex. HTML category)
  // GET for all posts in that category
  app.get("/api/posts/category/:category", function(req, res) {
    db.Post.findAll({
      where: {
        category: req.params.category
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
<<<<<<< HEAD
  // Individual Post page - Page with original post and all comments
  // GET for single post
  app.get("/api/posts/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  // PUT to update post
  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  // DELETE to remove post
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  // Create Post page - Page to create a forum post
  // POST new post
  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.Post.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    }).then(function(dbPost) {
      res.json(dbPost);
=======

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
>>>>>>> master
    });
  });
};

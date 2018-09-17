var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};

// API ROUTING OVERVIEW
  // Welcome page - Main landing page for forum
    // GET for recent posts
      get("/api/posts", function(req, res) {
        db.Post.findOne({where: {
          createdAt: recent
        }})
      });
  // Category page - Page listing all posts for a specific category (ex. HTML category)
    // GET for all posts in that category
      get("/api/:category", function(req, res) {
        db.Post.findAll({
          where: {
            category: req.params.category
          }
        })
      })

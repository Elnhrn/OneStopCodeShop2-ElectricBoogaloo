// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

module.exports = function(app) {
  // GET route for getting all of the post.
  app.get("/api/topics", function(req, res) {
    var query = {};
    // might need to change this so that it is referencing the proper forum post and any comments associated with that post.
    if (req.query.users_id) {
      query.usersId = req.query.users_id;
    }
    db.Topics.findAll({
      where: query,
      include: [db.Users]
    }).then(function(dbTopics) {
      res.json(dbTopics);
    });
  });
  // Get route for retrieving a single post.
  app.get("/api/topics/:id", function(req, res) {
    db.Topics.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Users]
    }).then(function(dbTopics) {
      res.json(dbTopics);
    });
  });
  // POST route for saving a new post
  app.post("/api/topics", function(req, res) {
    db.Topics.create(req.body).then(function(dbTopics) {
      res.json(dbTopics);
    });
  });
  // DELETE route for deleting posts
  app.delete("/api/topics/:id", function(req, res) {
    db.Topics.destroy({
      where: {
        id: req.params.id
      },
      include: [db.Users]
    }).then(function(dbTopics) {
      res.json(dbTopics);
    });
  });
  // PUT route for updating posts
  app.put("/api/topics", function(req, res) {
    db.Topics.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbTopics) {
      res.json(dbTopics);
    });
  });
};

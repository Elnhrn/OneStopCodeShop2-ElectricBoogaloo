// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

module.exports = function(app) {
  // GET route for getting all of the post.
  app.get("/api/post", function(req, res) {
    var query = {};
    // might need to change this so that it is referencing the proper forum post and any comments associated with that post.
    if (req.query.users_id) {
      query.UsersId = req.query.users_id;
    }
    db.Post.findAll({
      where: query,
      include: [db.Users.username, db.Comments.comment]
    }).then(function(dbForum) {
      res.json(dbForum);
    });
  });
  // Get route for retrieving a single post.
  app.get("/api/post/:id", function(req, res) {
    db.Forum.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Users.username, db.Comments.comment]
    }).then(function(dbForum) {
      res.json(dbForum);
    });
  });
  // POST route for saving a new post
  app.post("/api/post", function(req, res) {
    db.Post.create(req.body).then(function(dbForum) {
      res.json(dbForum);
    });
  });
  // DELETE route for deleting posts
  app.delete("/api/post/:id", function(req, res) {
    db.Forum.destroy({
      where: {
        id: req.params.id
      },
      include: [db.Comments.comment]
    }).then(function(dbForum) {
      res.json(dbForum);
    });
  });
  // PUT route for updating posts
  app.put("/api/post", function(req, res) {
    db.Forum.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbForum) {
      res.json(dbForum);
    });
  });
};

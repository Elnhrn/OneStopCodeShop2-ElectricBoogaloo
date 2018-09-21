// Requiring our models
var db = require("../models");

module.exports = function(app) {
  // GET route for getting all of the post.
  app.get("/api/replies", function(req, res) {
    var query = {};
    // might need to change this so that it is referencing the proper forum post and any comments associated with that post.
    if (req.query.users_id && req.query.posts_id) {
      query.UsersId = req.query.users_id;
    }
    db.Replies.findAll({
      where: query,
      include: [db.Posts, db.Users]
    }).then(function(dbReplies) {
      res.json(dbReplies);
    });
  });
  // Get route for retrieving a single post.
  app.get("/api/replies/:id", function(req, res) {
    db.Replies.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Posts, db.Users]
    }).then(function(dbReplies) {
      res.json(dbReplies);
    });
  });
  // POST route for saving a new post
  app.post("/api/replies", function(req, res) {
    db.Replies.create(req.body).then(function(dbReplies) {
      res.json(dbReplies);
    });
  });
  // DELETE route for deleting posts
  app.delete("/api/replies/:id", function(req, res) {
    db.Replies.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbReplies) {
      res.json(dbReplies);
    });
  });
  // PUT route for updating posts
  app.put("/api/replies", function(req, res) {
    db.Replies.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbReplies) {
      res.json(dbReplies);
    });
  });
};

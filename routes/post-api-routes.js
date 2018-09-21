// Requiring our models
var db = require("../models");

module.exports = function(app) {
  // GET route for getting all of the post.
  app.get("/api/posts", function(req, res) {
    var query = {};
    // might need to change this so that it is referencing the proper forum post and any comments associated with that post.
    if (req.query.replies_id && req.query.user_id && req.query.topics_id) {
      query.UsersId = req.query.users_id;
    }
    db.Posts.findAll({
      where: query,
      include: [db.Replies, db.Users, db.Topics]
    }).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });
  // Get route for retrieving a single post.
  app.get("/api/posts/:id", function(req, res) {
    db.Posts.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Replies, db.Users, db.Topics]
    }).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });
  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    db.Posts.create(req.body).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });
  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Posts.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });
  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Posts.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });
};

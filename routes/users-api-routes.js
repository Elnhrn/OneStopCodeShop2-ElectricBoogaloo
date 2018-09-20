var db = require("../models");

module.exports = function(app) {
  app.get("/api/userTable", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Users.findAll({
      include: [db.Posts, dp.Replies]
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.get("/api/userTable/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Users.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Posts, db.Replies]
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.post("/api/userTable", function(req, res) {
    db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.delete("/api/userTable/:id", function(req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
};

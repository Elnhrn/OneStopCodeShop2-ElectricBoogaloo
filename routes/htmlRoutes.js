var path = require("path");

module.exports = function(app) {
  // HTML ROUTE OVERVIEW
  // Welcome page - Main landing page for forum
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  // Category page - Page listing all posts for a specific category (ex. HTML category)
  app.get("/category", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/category.html"));
  });
  // Individual Post page - Page with original post and all comments
  app.get("/post", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/post.html"));
  });
  // Create Post page - Page to create a forum post
  app.get("/create", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/create.html"));
  });
};
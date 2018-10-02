require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");
var expressSession = require("express-session");
var db = require("./models");

var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var PORT = process.env.PORT || 8080;


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(express.static("public"));
app.use(
  expressSession({
    key: "user_sid",
    secret: "JRS",
    resave: false,
    saveUninitialized: true,
    cookies: { secure: false }
  })
);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/loginRoutes")(app);
require("./routes/topics-api-routes")(app);
require("./routes/users-api-routes")(app);
require("./routes/post-api-routes")(app);
require("./routes/reply-api-routes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  server.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

// CHAT APPLICATION CODE

users = [];
connections = [];

io.sockets.on("connection", function(socket) {
  connections.push(socket);
  console.log("Connected: %s sockets connect", connections.length);

  socket.on("disconnect", function(data) {
    console.log(data);
    users.splice(users.indexOf(socket.username), 1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnected: %s sockets connected", connections.length);
  });

  socket.on("send message", function(data) {
    io.sockets.emit("new message", { msg: data, user: socket.username });
    console.log(data);
  });

  socket.on("new user", function(data, cb) {
    cb(true);
    socket.username = data;
    users.push(socket.username);
    updateUsernames();
  });

  function updateUsernames() {
    io.sockets.emit("get users", users);
  }
});

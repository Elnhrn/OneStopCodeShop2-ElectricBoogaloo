var express = require("express");
var app = express();
server = require("http").createServer(app);
var io = require("socket.io").listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log("The server is running...");

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/EGA_chat-index.html");
});

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

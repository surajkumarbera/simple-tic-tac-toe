const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const Users = require("./user");
const Rooms = require("./room");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use("/", express.static("public"));

const users = new Users();
const rooms = new Rooms();

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    const user = users.getUserBySocket(socket);
    if (user) rooms.leaveRoom(io, user);
  });

  // user registration
  socket.on("register", (userId) => {
    if (!users.oldUser(socket, userId)) {
      users.newUser(socket);
    }
  });

  //create-room
  socket.on("create-room", ({ userId }) => {
    const user = users.getUser(userId);
    if (user) {
      rooms.leaveRoom(io, user);
      rooms.createRoom(user);
    }
  });

  //join-room
  socket.on("join-room", ({ userId, roomId }) => {
    const user = users.getUser(userId);
    if (user) {
      rooms.leaveRoom(io, user);
      rooms.joinRoom(io, user, roomId);
    }
  });

  //btn pressed
  socket.on("btnPressed", ({ userId, roomId, btnId }) => {
    rooms.played(io, userId, roomId, btnId);
  });

  socket.on("reset", (roomId) => {
    rooms.reset(io, roomId);
  });
});

module.exports = server;

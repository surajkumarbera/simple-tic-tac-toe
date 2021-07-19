const { v4: uuidv4 } = require("uuid");

class Users {
  constructor() {
    this.users = [];
  }

  newUser(socket) {
    const userId = uuidv4();
    this.users.push({
      userId: userId,
      socket: socket,
    });
    socket.emit("register", userId);
    console.log(
      `new-user:
        socketID:${socket.id}
        userId:${userId}
        `
    );
  }

  oldUser(socket, userId) {
    const user = this.users.find((element, index) => {
      if (element.userId == userId) {
        this.users[index].socket = element.socket = socket;
        return true;
      }
    });

    if (user) {
      console.log(
        `old-user:
          socketID:${socket.id}
          userId:${userId}
          `
      );
      return true;
    }
    return false;
  }

  getUser(userId) {
    return this.users.find((user) => user.userId == userId);
  }

  getUserBySocket(socket) {
    return this.users.find((user) => user.socket.id == socket.id);
  }
}

module.exports = Users;

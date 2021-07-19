const { v4: uuidv4 } = require("uuid");

class Rooms {
  constructor() {
    this.rooms = [];
  }

  createRoom(user) {
    const room = {
      roomId: uuidv4(),
      totalUsers: 1,
      user1: user.userId,
      user2: "",
      user1Active: true,
      user2active: false,
      arr: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      lastPlayed: 0,
      user1Win: 0,
      user2Win: 0,
    };
    this.rooms.push(room);
    user.socket.join(room.roomId);
    user.socket.emit("room-created", room.roomId);
    console.log(
      `room-created:
        room-id: ${room.roomId}
        user1: ${room.user1}
        rooms: ${this.rooms.length}
        `
    );
  }

  joinRoom(io, user, roomId) {
    const room = this.rooms.find((room, index) => {
      if (room.roomId == roomId) {
        if (room.totalUsers == 1) {
          //add user to room
          if (this.rooms[index].user1 == user.userId) {
            //reconnect first user
            this.rooms[index].user1Active = true;
            user.socket.join(room.roomId);
            io.to(room.roomId).emit("room-rejoined", {
              roomId: room.roomId,
              userId: user.userId,
              arr: [...this.rooms[index].arr],
            });
            console.log(
              `room-rejoined:
                room-id: ${room.roomId}
                user1: ${room.user1}
                `
            );
          } else {
            //new second user
            this.rooms[index].user2 = user.userId;
            this.rooms[index].user2Active = true;
            this.rooms[index].totalUsers = 2;
            user.socket.join(room.roomId);
            io.to(room.roomId).emit("room-joined", {
              roomId: room.roomId,
              userId: user.userId,
              arr: [...this.rooms[index].arr],
            });
            console.log(
              `room-joined:
                room-id: ${room.roomId}
                user2: ${room.user2}
                `
            );
          }
        } else if (room.totalUsers == 2) {
          if (this.rooms[index].user1 == user.userId) {
            //reconnect first user
            this.rooms[index].user1Active = true;
            user.socket.join(room.roomId);
            io.to(room.roomId).emit("room-rejoined", {
              roomId: room.roomId,
              userId: user.userId,
              arr: [...this.rooms[index].arr],
            });
            console.log(
              `room-rejoined:
                room-id: ${room.roomId}
                user1: ${room.user1}
                `
            );
          } else if (this.rooms[index].user2 == user.userId) {
            //reconnect second user
            this.rooms[index].user2Active = true;
            user.socket.join(room.roomId);
            io.to(room.roomId).emit("room-rejoined", {
              roomId: room.roomId,
              userId: user.userId,
              arr: [...this.rooms[index].arr],
            });
            console.log(
              `room-rejoined:
                room-id: ${room.roomId}
                user2: ${room.user2}
                `
            );
          } else {
            user.socket.emit("room-full", room.roomId);
          }
        } else {
          user.socket.emit("invalid-roomId");
        }
        return true;
      } else {
        return false;
      }
    });

    if (!room) {
      user.socket.emit("invalid-roomId");
    }
  }

  leaveRoom(io, user) {
    const room = this.rooms.find((room, index) => {
      if (room.user1 == user.userId) {
        this.rooms[index].user1Active = false;
        user.socket.leave(room.roomId);
        io.to(room.roomId).emit("friend-disconnected");
        console.log(
          `room-leave:
            room-id: ${room.roomId}
            user1: ${room.user1}
            `
        );
        return true;
      } else if (room.user2 == user.userId) {
        this.rooms[index].user2Active = false;
        user.socket.leave(room.roomId);
        io.to(room.roomId).emit("friend-disconnected");
        console.log(
          `room-leave:
            room-id: ${room.roomId}
            user2: ${room.user2}
            `
        );
        return true;
      } else {
        return false;
      }
    });

    if (!room) {
      return false;
    } else {
      if (!room.user1Active && !room.user2Active) {
        //delete the room
        this.rooms = this.rooms.filter(
          (roomElement) => roomElement.roomId != room.roomId
        );
        console.log(
          `room-deleted:
            room-id: ${room.roomId}
            rooms: ${this.rooms.length}
            `
        );
      }
      return true;
    }
  }

  win(user, roomIndex) {
    if (
      (this.rooms[roomIndex].arr[0] == user &&
        this.rooms[roomIndex].arr[1] == user &&
        this.rooms[roomIndex].arr[2] == user) ||
      (this.rooms[roomIndex].arr[3] == user &&
        this.rooms[roomIndex].arr[4] == user &&
        this.rooms[roomIndex].arr[5] == user) ||
      (this.rooms[roomIndex].arr[6] == user &&
        this.rooms[roomIndex].arr[7] == user &&
        this.rooms[roomIndex].arr[8] == user) ||
      (this.rooms[roomIndex].arr[0] == user &&
        this.rooms[roomIndex].arr[3] == user &&
        this.rooms[roomIndex].arr[6] == user) ||
      (this.rooms[roomIndex].arr[1] == user &&
        this.rooms[roomIndex].arr[4] == user &&
        this.rooms[roomIndex].arr[7] == user) ||
      (this.rooms[roomIndex].arr[2] == user &&
        this.rooms[roomIndex].arr[5] == user &&
        this.rooms[roomIndex].arr[8] == user) ||
      (this.rooms[roomIndex].arr[0] == user &&
        this.rooms[roomIndex].arr[4] == user &&
        this.rooms[roomIndex].arr[8] == user) ||
      (this.rooms[roomIndex].arr[2] == user &&
        this.rooms[roomIndex].arr[4] == user &&
        this.rooms[roomIndex].arr[6] == user)
    ) {
      return true;
    }

    return false;
  }

  played(io, userId, roomId, btnId) {
    if (!(btnId > 0 && btnId < 10)) return;

    this.rooms.find((room, index) => {
      if (room.roomId == roomId) {
        if (room.totalUsers != 2) {
          io.to(roomId).emit("alone", "Ask Your friend to join Using Room Id");
        } else if (room.arr[btnId - 1] == 0) {
          if (
            room.user1 == userId &&
            (room.lastPlayed == 2 || room.lastPlayed == 0)
          ) {
            this.rooms[index].arr[btnId - 1] = 1;
            this.rooms[index].lastPlayed = 1;
            console.log(
              `played-user1:
                roomId: ${roomId}
                arr: ${this.rooms[index].arr}`
            );
            if (this.win(1, index)) {
              this.rooms[index].user1Win += 1;
              io.to(roomId).emit("update", {
                end: true,
                arr: [...this.rooms[index].arr],
                user1Win: this.rooms[index].user1Win,
                user2Win: this.rooms[index].user2Win,
                playedBy: userId,
                user1: this.rooms[index].user1,
                user2: this.rooms[index].user2,
              });
            } else {
              io.to(roomId).emit("update", {
                end: false,
                arr: [...this.rooms[index].arr],
                user1Win: this.rooms[index].user1Win,
                user2Win: this.rooms[index].user2Win,
                playedBy: userId,
                user1: this.rooms[index].user1,
                user2: this.rooms[index].user2,
              });
            }
          } else if (
            room.user2 == userId &&
            (room.lastPlayed == 1 || room.lastPlayed == 0)
          ) {
            this.rooms[index].arr[btnId - 1] = 2;
            this.rooms[index].lastPlayed = 2;
            console.log(
              `played-user2:
                roomId: ${roomId}
                arr: ${this.rooms[index].arr}`
            );
            if (this.win(2, index)) {
              this.rooms[index].user2Win += 1;
              io.to(roomId).emit("update", {
                end: true,
                arr: [...this.rooms[index].arr],
                user1Win: this.rooms[index].user1Win,
                user2Win: this.rooms[index].user2Win,
                playedBy: userId,
                user1: this.rooms[index].user1,
                user2: this.rooms[index].user2,
              });
            } else {
              io.to(roomId).emit("update", {
                end: false,
                arr: [...this.rooms[index].arr],
                user1Win: this.rooms[index].user1Win,
                user2Win: this.rooms[index].user2Win,
                playedBy: userId,
                user1: this.rooms[index].user1,
                user2: this.rooms[index].user2,
              });
            }
          }
        }
      }
    });
  }

  reset(io, roomId) {
    this.rooms.find((room, index) => {
      if (room.roomId == roomId) {
        this.rooms[index].arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.rooms[index].lastPlayed = 0;

        io.to(roomId).emit("update", {
          end: false,
          arr: [...this.rooms[index].arr],
          user1Win: this.rooms[index].user1Win,
          user2Win: this.rooms[index].user2Win,
          playedBy: "",
          user1: this.rooms[index].user1,
          user2: this.rooms[index].user2,
        });
        return true;
      } else {
        return false;
      }
    });
  }
}

module.exports = Rooms;

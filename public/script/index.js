console.log("Hello !");

// getting view elements
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var btn4 = document.getElementById("btn4");
var btn5 = document.getElementById("btn5");
var btn6 = document.getElementById("btn6");
var btn7 = document.getElementById("btn7");
var btn8 = document.getElementById("btn8");
var btn9 = document.getElementById("btn9");
var playGround = document.getElementById("playGround");
var intro = document.getElementById("intro");
var createRoom = document.getElementById("createRoom");
var joinRoom = document.getElementById("joinRoom");
var roomId = document.getElementById("roomId");
var youWin = document.getElementById("youWin");
var frndWin = document.getElementById("frndWin");
var roomIdSpan = document.getElementById("roomIdSpan");

//hide play ground show intro
intro.style.display = "block";
playGround.style.display = "none";

// initializing socket
console.log("initializing socket");
var socket = io({
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: 10,
});

// user registration
console.log("registraing user");
socket.emit("register", localStorage.getItem("tictactoeuserid"));
socket.on("register", (id) => {
  localStorage.setItem("tictactoeuserid", id);
});

socket.on("room-created", (roomId) => {
  localStorage.setItem("tictactoeroomid", roomId);
  console.log("room id: ", localStorage.getItem("tictactoeroomid", roomId));
  //show play ground hide intro
  intro.style.display = "none";
  playGround.style.display = "block";
  roomIdSpan.innerText = roomId;
});

socket.on("room-joined", ({ userId, roomId, arr }) => {
  arr.forEach((v, index) => changeBtnView(index, v));
  if (localStorage.getItem("tictactoeuserid") != userId) {
    console.log("friend joined room");
    alert("Friend joined");
  } else {
    localStorage.setItem("tictactoeroomid", roomId);
    console.log("room id: ", localStorage.getItem("tictactoeroomid", roomId));
    console.log("you joined room");
    roomIdSpan.innerText = roomId;
  }
  //show play ground hide intro
  intro.style.display = "none";
  playGround.style.display = "block";
});

socket.on("room-rejoined", ({ userId, roomId, arr }) => {
  arr.forEach((v, index) => changeBtnView(index, v));
  if (localStorage.getItem("tictactoeuserid") != userId) {
    console.log("friend rejoined room");
    alert("Friend rejoined");
  } else {
    localStorage.setItem("tictactoeroomid", roomId);
    console.log("room id: ", localStorage.getItem("tictactoeroomid", roomId));
    console.log("you rejoined room");
    roomIdSpan.innerText = roomId;
  }
  //show play ground hide intro
  intro.style.display = "none";
  playGround.style.display = "block";
});

socket.on("room-full", (roomId) => {
  alert("room-full: ", roomId);
});

socket.on("invalid-roomId", () => {
  alert("invalid-roomId");
});

socket.on("friend-disconnected", () => {
  console.log("friend-disconnected");
  alert("Friend disconnected");
});
//on view update

function changeBtnView(i, v) {
  switch (i + 1) {
    case 1:
      if (v == 0) {
        btn1.style.backgroundImage = "none";
        btn1.style.backgroundColor = "rgba(128, 128, 128,0.13)";
      } else if (v == 1) {
        btn1.style.backgroundImage = 'url("../../img/round.png")';
        btn1.style.backgroundSize = "cover";
      } else if (v == 2) {
        btn1.style.backgroundImage = 'url("../../img/cross.png")';
        btn1.style.backgroundSize = "cover";
      }
      break;
    case 2:
      if (v == 0) {
        btn2.style.backgroundImage = "none";
        btn2.style.backgroundColor = "rgba(128, 128, 128,0.13)";
      } else if (v == 1) {
        btn2.style.backgroundImage = 'url("../../img/round.png")';
        btn2.style.backgroundSize = "cover";
      } else if (v == 2) {
        btn2.style.backgroundImage = 'url("../../img/cross.png")';
        btn2.style.backgroundSize = "cover";
      }
      break;
    case 3:
      if (v == 0) {
        btn3.style.backgroundImage = "none";
        btn3.style.backgroundColor = "rgba(128, 128, 128,0.13)";
      } else if (v == 1) {
        btn3.style.backgroundImage = 'url("../../img/round.png")';
        btn3.style.backgroundSize = "cover";
      } else if (v == 2) {
        btn3.style.backgroundImage = 'url("../../img/cross.png")';
        btn3.style.backgroundSize = "cover";
      }
      break;
    case 4:
      if (v == 0) {
        btn4.style.backgroundImage = "none";
        btn4.style.backgroundColor = "rgba(128, 128, 128,0.13)";
      } else if (v == 1) {
        btn4.style.backgroundImage = 'url("../../img/round.png")';
        btn4.style.backgroundSize = "cover";
      } else if (v == 2) {
        btn4.style.backgroundImage = 'url("../../img/cross.png")';
        btn4.style.backgroundSize = "cover";
      }
      break;
    case 5:
      if (v == 0) {
        btn5.style.backgroundImage = "none";
        btn5.style.backgroundColor = "rgba(128, 128, 128,0.13)";
      } else if (v == 1) {
        btn5.style.backgroundImage = 'url("../../img/round.png")';
        btn5.style.backgroundSize = "cover";
      } else if (v == 2) {
        btn5.style.backgroundImage = 'url("../../img/cross.png")';
        btn5.style.backgroundSize = "cover";
      }
      break;
    case 6:
      if (v == 0) {
        btn6.style.backgroundImage = "none";
        btn6.style.backgroundColor = "rgba(128, 128, 128,0.13)";
      } else if (v == 1) {
        btn6.style.backgroundImage = 'url("../../img/round.png")';
        btn6.style.backgroundSize = "cover";
      } else if (v == 2) {
        btn6.style.backgroundImage = 'url("../../img/cross.png")';
        btn6.style.backgroundSize = "cover";
      }
      break;
    case 7:
      if (v == 0) {
        btn7.style.backgroundImage = "none";
        btn7.style.backgroundColor = "rgba(128, 128, 128,0.13)";
      } else if (v == 1) {
        btn7.style.backgroundImage = 'url("../../img/round.png")';
        btn7.style.backgroundSize = "cover";
      } else if (v == 2) {
        btn7.style.backgroundImage = 'url("../../img/cross.png")';
        btn7.style.backgroundSize = "cover";
      }
      break;
    case 8:
      if (v == 0) {
        btn8.style.backgroundImage = "none";
        btn8.style.backgroundColor = "rgba(128, 128, 128,0.13)";
      } else if (v == 1) {
        btn8.style.backgroundImage = 'url("../../img/round.png")';
        btn8.style.backgroundSize = "cover";
      } else if (v == 2) {
        btn8.style.backgroundImage = 'url("../../img/cross.png")';
        btn8.style.backgroundSize = "cover";
      }
      break;
    case 9:
      if (v == 0) {
        btn9.style.backgroundImage = "none";
        btn9.style.backgroundColor = "rgba(128, 128, 128,0.13)";
      } else if (v == 1) {
        btn9.style.backgroundImage = 'url("../../img/round.png")';
        btn9.style.backgroundSize = "cover";
      } else if (v == 2) {
        btn9.style.backgroundImage = 'url("../../img/cross.png")';
        btn9.style.backgroundSize = "cover";
      }
      break;
  }
}

socket.on("update", (msg) => {
  var { end, arr, user1Win, user2Win, playedBy, user1, user2 } = msg;
  console.log(msg);
  if (playedBy == localStorage.getItem("tictactoeuserid")) {
    playGround.style.border = "1px solid black";
  } else {
    playGround.style.border = "5px solid green";
  }
  arr.forEach((v, index) => changeBtnView(index, v));
  if (user1 == localStorage.getItem("tictactoeuserid")) {
    youWin.innerText = `You: ${user1Win}`;
    frndWin.innerText = `Friend: ${user2Win}`;
  } else if (user2 == localStorage.getItem("tictactoeuserid")) {
    youWin.innerText = `You: ${user2Win}`;
    frndWin.innerText = `Friend: ${user1Win}`;
  }

  if (end == true) {
    socket.emit("reset", localStorage.getItem("tictactoeroomid"));
    if (playedBy == localStorage.getItem("tictactoeuserid")) alert("You Win!");
    else alert("Friend Win!");
  } else {
    var emptyCell = 0;
    for (var i = 0; i < 9; i++) {
      if (arr[i] == 0) emptyCell++;
    }
    if (emptyCell == 0) {
      socket.emit("reset", localStorage.getItem("tictactoeroomid"));
      alert("Match Dro!");
    }
  }
});

socket.on("alone", (msg) => {
  alert(msg);
});
//grid btn presed function
function btnPressed(btnId) {
  socket.emit("btnPressed", {
    userId: localStorage.getItem("tictactoeuserid"),
    roomId: localStorage.getItem("tictactoeroomid", roomId),
    btnId: btnId,
  });
}

//Invite Friend btn pressed
function inviteFriend() {
  console.log("create-room request");
  socket.emit("create-room", {
    userId: localStorage.getItem("tictactoeuserid"),
  });
}

//join Friend btn pressed
function joinFriend() {
  console.log("join-room request");
  socket.emit("join-room", {
    userId: localStorage.getItem("tictactoeuserid"),
    roomId: roomId.value,
  });
}

// assigning onclick functions
btn1.onclick = () => btnPressed(1);
btn2.onclick = () => btnPressed(2);
btn3.onclick = () => btnPressed(3);
btn4.onclick = () => btnPressed(4);
btn5.onclick = () => btnPressed(5);
btn6.onclick = () => btnPressed(6);
btn7.onclick = () => btnPressed(7);
btn8.onclick = () => btnPressed(8);
btn9.onclick = () => btnPressed(9);
createRoom.onclick = inviteFriend;
joinRoom.onclick = joinFriend;

const express = require("express");
const socket = require('socket.io');
const app = express();
let Player = require("./Player");

let server = app.listen(4000);
app.use(express.static("public"));


let io = socket(server);

let players = [];
let sentence = "int main(){printf (\"Hi World\\n\");return 0;}";
setInterval(updateGame, 16);


io.sockets.on("connection", socket => {
  console.log(`New connection ${socket.id}`);
  players.push(createNewPlayer(socket));
  socket.on("disconnect", () => {
    io.sockets.emit("disconnect", socket.id);
    players = players.filter(player => player.id !== socket.id);
  });

  socket.on("keyPressed", (key) => {
    let player = getPlayer(socket);
    player.keyPressed(key);

  });
});


io.sockets.on("disconnect", socket => {
  io.sockets.emit("disconnect", socket.id);
  players = players.filter(player.id !== socket.id);
});


function createNewPlayer(socket) {
  let playersYPosition = players[players.length-1] ? players[players.length-1].y + 100 : 200;
  return new Player(socket.id, playersYPosition, sentence);
}



function getPlayer(socket) {
  for (let i = 0; i < players.length ; i++) {
    if (players[i].id === socket.id) {
      return players[i];
    }
  }
  return undefined;
}


function updateGame() {

  io.sockets.emit("heartbeat", players);
}





const express = require("express");
const socket = require('socket.io');
const app = express();
const GameEngine = require("./GameEngine");


const gameEngine = new GameEngine();
let server = app.listen(4000);

app.use(express.static("public"));

let io = socket(server);

setInterval(updateGame, 16);



io.sockets.on("connection", socket => {
  console.log(`New connection ${socket.id}`);
  gameEngine.createNewPlayer(socket.id);

  socket.on("disconnect", () => {
    io.sockets.emit("disconnect", socket.id);
    gameEngine.removePlayer(socket.id);
  });

  socket.on("keyPressed", (key) => {
    if (!gameEngine.correctKeyPressed(key, socket.id)) {
      if (!isModifierKey(key)) {
        socket.emit("wrongLetter")
      }
    }
  });


  function isModifierKey(key) {
    return key === "Shift" || key === "Control" || key === "Alt"
  }
});


function updateGame() {
  gameEngine.updatePlayers();
  io.sockets.emit("heartbeat", gameEngine.players);
  io.sockets.emit("sentence", gameEngine.sentence);
  if (gameEngine.winner && !gameEngine.restartCountdown) {
    // emit event to show everyone that the game is finished
    io.sockets.emit("winner", gameEngine.winner.id);
    gameEngine.restartCountdown = setTimeout(() => restartGame(), 5000);
  }
}

function restartGame() {
  // emit event to reset players
  io.sockets.emit("restart");
  gameEngine.restart();
}
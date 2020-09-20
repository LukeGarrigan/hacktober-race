const express = require('express');
const socket = require('socket.io');
const app = express();
const GameEngine = require('./GameEngine');

const gameEngine = new GameEngine();
const server = app.listen(4000);
console.log('Server running on 4000');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

const io = socket(server);

setInterval(updateGame, 16);

io.sockets.on('connection', socket => {
  console.log(`New connection ${socket.id}`);
  gameEngine.createNewPlayer(socket.id);

  socket.on('disconnect', () => {
    io.sockets.emit('disconnect', socket.id);
    gameEngine.removePlayer(socket.id);
  });

  socket.on('keyPressed', (key) => {
    if (!gameEngine.correctKeyPressed(key, socket.id)) {
      if (!isModifierKey(key)) {
        socket.emit('wrongLetter');
      }
    }
  });

  function isModifierKey (key) {
    return key === 'Shift' || key === 'Control' || key === 'Alt';
  }
});

function updateGame () {
  gameEngine.updatePlayers();
  io.sockets.emit('heartbeat', gameEngine.players);
  io.sockets.emit('sentence', gameEngine.sentence);
  if (gameEngine.winner && !gameEngine.endGameCountdown) {
    gameEngine.endGameCountdown = setTimeout(() => {
      console.log('Emitting restart event');
      gameEngine.restart();
      io.sockets.emit('restart');
      setTimeout(() => {
        gameEngine.winner = null
        gameEngine.endGameCountdown = null;
        console.log('10 second restart timer stopped, players can start typing');
      }, 10000);
    }, 5000);
  }
}

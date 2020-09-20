import Terminal from './Terminal.js';
import MasterBranch from './MasterBranch.js';
import PlayersHandler from './PlayersHandler.js';
import CountDown from './CountDown.js';

const socket = io.connect('http://localhost:4000');
const playersHandler = new PlayersHandler();
let terminal;
let masterBranch;
const countDown = new CountDown();

window.setup = function () {
  createCanvas(innerWidth, innerHeight);
  masterBranch = new MasterBranch();
  terminal = new Terminal();

  registerSocketHandlers();
};

window.onresize = function () {
  resizeCanvas(innerWidth, innerHeight);
  terminal.resize();
};

window.draw = function () {
  background(14, 16, 18);
  if (playersHandler.getPlayer(socket.id)) {
    terminal.updatePlayerCurrentLetter(playersHandler.getPlayer(socket.id).currentIndex);
  }

  terminal.draw();
  playersHandler.draw();
  masterBranch.draw();
  countDown.draw();
};

window.keyPressed = function (e) {
  e.preventDefault();
  terminal.wrongLetter = false;
  socket.emit('keyPressed', key);
};

function registerSocketHandlers () {
  socket.on('sentence', sentence => terminal.updateSentence(sentence));
  socket.on('heartbeat', players => playersHandler.updatePlayers(players));
  socket.on('disconnect', playerId => playersHandler.removePlayer(playerId));
  socket.on('wrongLetter', () => { terminal.wrongLetter = true; });
  socket.on('restart', () => {
    playersHandler.resetPlayers();
    countDown.beginGameStarting();
  });
}

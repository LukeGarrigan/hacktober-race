import Terminal from './Terminal.js';
import MasterBranch from './MasterBranch.js';
import PlayersHandler from './PlayersHandler.js';
import CountDown from './CountDown.js';
import Background from './NoiseBackground.js';

const socket = io.connect('http://localhost:4000');
const playersHandler = new PlayersHandler();
let terminal;
let masterBranch;
let countDown = new CountDown();
let noiseBackground;

window.setup = function () {
  createCanvas(innerWidth, innerHeight);
  masterBranch = new MasterBranch();
  terminal = new Terminal();
  noiseBackground = new Background();

  registerSocketHandlers();
};


window.onresize = function()
{
  resizeCanvas(innerWidth, innerHeight);
  terminal.resize()
}


window.draw = function () {
  
  if (playersHandler.getPlayer(socket.id)) {
    terminal.updatePlayerCurrentLetter(playersHandler.getPlayer(socket.id).currentIndex);
  }
  noiseBackground.draw();
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
  socket.on('winner', winner => {}); // display some sort of message? perhaps start drawing a countdown
  socket.on('restart', () =>  {
    playersHandler.resetPlayers();
    countDown.beginGameStarting();
  });
}

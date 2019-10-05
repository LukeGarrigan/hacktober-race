import Terminal from "./Terminal.js";
import MasterBranch from "./MasterBranch.js";
import PlayersHandler from "./PlayersHandler.js";


const socket = io.connect('http://localhost:4000');
let playersHandler = new PlayersHandler();
let terminal;
let masterBranch;

window.setup = function () {
    createCanvas(windowWidth, windowHeight);
    masterBranch = new MasterBranch();
    terminal = new Terminal();


    registerSocketHandlers();
}

window.draw = function () {
    background(14, 16, 18);
    if (playersHandler.getPlayer(socket.id)) {
        terminal.updatePlayerCurrentLetter(playersHandler.getPlayer(socket.id).currentIndex);
    }

    terminal.draw();
    playersHandler.draw();
    masterBranch.draw();
}

window.keyPressed = function(e){
    e.preventDefault();
    terminal.wrongLetter = false;
    socket.emit("keyPressed", key);
}

function registerSocketHandlers() {
    socket.on("sentence", sentence => terminal.updateSentence(sentence));
    socket.on("heartbeat", players => playersHandler.updatePlayers(players));
    socket.on("disconnect", playerId => playersHandler.removePlayer(playerId));
    socket.on("wrongLetter", () => terminal.wrongLetter = true);
    socket.on("winner", winner => {});  // display some sort of message? perhaps start drawing a countdown
    socket.on("restart", () => playersHandler.resetPlayers());
}



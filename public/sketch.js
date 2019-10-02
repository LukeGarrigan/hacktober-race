import Terminal from "./Terminal.js";
import MasterBranch from "./MasterBranch.js";
import PlayersHandler from "./PlayersHandler.js";


const socket = io.connect('http://localhost:4000');
let playersHandler = new PlayersHandler();

socket.on("heartbeat", players => playersHandler.updatePlayers(players));
socket.on("disconnect", playerId => playersHandler.removePlayer(playerId));

let terminal;
let masterBranch;

window.setup = function () {
    createCanvas(windowWidth, windowHeight);
    terminal = new Terminal();
    masterBranch = new MasterBranch();
}

window.draw = function () {
    background(14, 16, 18);
    terminal.draw();
    playersHandler.draw();
    masterBranch.draw();
}

window.keyPressed = function(){
    console.log(key);
    socket.emit("keyPressed", key);
}




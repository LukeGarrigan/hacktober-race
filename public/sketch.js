import Player from "./Player.js";
import Terminal from "./Terminal.js";
import MasterBranch from "./MasterBranch.js";


const socket = io.connect('http://localhost:4000');

let players = [];

socket.on("heartbeat", players => updatePlayers(players));
socket.on("disconnect", playerId => removePlayer(playerId));

let terminal;
let masterBranch;
window.setup = function () {
    createCanvas(windowWidth, windowHeight);
    terminal = new Terminal("This is the sentence you have to write");
    masterBranch = new MasterBranch();
}

window.draw = function () {
    background(14, 16, 18);
    terminal.draw();
    players.forEach(player => player.draw());
    masterBranch.draw();
}

function updatePlayers(serverPlayers) {
    for (let i = 0; i < serverPlayers.length; i++) {
        let playerFromServer = serverPlayers[i];

        let existingPlayer = playerExists(playerFromServer);
        if (!existingPlayer) {
            players.push(new Player(playerFromServer));
        } else {
            existingPlayer.x = playerFromServer.x;
        }
    }
}

function playerExists(playerFromServer) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].id === playerFromServer.id) {
            return players[i];
        }
    }
    return undefined;
}

function removePlayer(playerId) {
    players = players.filter(player => player.id !== playerId);
}

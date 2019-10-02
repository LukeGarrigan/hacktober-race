import Player from "./Player.js";

export default class PlayersHandler {


    constructor() {
        this.players = [];
    }

    updatePlayers(serverPlayers) {
        for (let i = 0; i < serverPlayers.length; i++) {
            let playerFromServer = serverPlayers[i];

            let existingPlayer = this.playerExists(playerFromServer);
            if (!existingPlayer) {
                this.players.push(new Player(playerFromServer));
            } else {
                existingPlayer.currentIndex = playerFromServer.currentIndex;
            }
        }
    }

    playerExists(playerFromServer) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].id === playerFromServer.id) {
                return this.players[i];
            }
        }
        return undefined;
    }

    removePlayer(playerId) {
        this.players = this.players.filter(player => player.id !== playerId);
    }

    draw() {
        this.players.forEach(player => player.draw());
    }


}
const Player = require("./Player");

class GameEngine {
    constructor() {
        this.players = [];
        this.sentence = "int main(){printf (\"Hi World\\n\");return 0;}";
        this.winner = undefined;
        this.restartCountdown = undefined;
    }

    createNewPlayer(socketId) {
        let playersYPosition = this.players[this.players.length-1] ? this.players[this.players.length-1].y + 100 : 200;
        this.addPlayer(new Player(socketId, playersYPosition, this.sentence));
    }

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayer(id) {
        this.players = this.players.filter(player => player.id !== id);
    }

    correctKeyPressed(key, id) {
        let player = this.getPlayer(id);
        return player.correctKeyPressed(key);
    }

    getPlayer(id) {
        for (let i = 0; i < this.players.length ; i++) {
            if (this.players[i].id === id) {
                return this.players[i];
            }
        }
        return undefined;
    }

    updatePlayers() {
        if (this.winner)  return;
        this.players.forEach(player => {
            this.findWinner(player);
        });
    }

    findWinner(player) {
        if (player.hasFinished()) {
            player.finished = true;
            let playerFinishCount = this.players.filter(p => p.finished).length;
            if (playerFinishCount === 1) {
                player.winner = true;
                this.winner = player;
                console.log(`player ${this.winner.id} won (game finished), restarting game soon`);
            }
        }
    }

    restart() {
        console.log('restarting game now');
        let socketIds = this.players.map(player => player.id);
        this.players = [];
        socketIds.map(id => this.createNewPlayer(id));
        delete this.winner;
        delete this.restartCountdown;
    }
}

module.exports = GameEngine;
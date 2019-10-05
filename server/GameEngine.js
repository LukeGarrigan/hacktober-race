const Player = require("./Player");
const randomSentence = require('./randomSentence');

class GameEngine {
    constructor() {
        this.players = [];
        this.sentence = randomSentence();   // perhaps move these to a newGame function
    }

    createNewPlayer(socket) {
        let playersYPosition = this.players[this.players.length-1] ? this.players[this.players.length-1].y + 100 : 200;
        this.addPlayer(new Player(socket.id, playersYPosition, this.sentence));
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
        this.players.forEach(player => {
            this.findWinner(player);
        });
    }

    findWinner(player) {
        if (player.hasFinished()) {
            player.triggerEnd(this.sentence.length);
            let playerFinishCount = this.players.filter(p => p.finished).length;
            if (playerFinishCount === 1) {
                player.winner = true;
            }
        }
    }
}

module.exports = GameEngine;
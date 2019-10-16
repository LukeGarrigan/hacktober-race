const Player = require('./Player');
const randomSentence = require('./randomSentence');

class GameEngine {
  constructor () {
    this.players = [];
    this.sentence = randomSentence();
    this.winner = undefined;
    this.endGameCountdown = undefined;
  }

  createNewPlayer (socketId) {
    this.addPlayer(new Player(socketId, this.sentence));
  }

  addPlayer (player) {
    this.players.push(player);
  }

  removePlayer (id) {
    this.players = this.players.filter(player => player.id !== id);
  }

  correctKeyPressed (key, id) {
    const player = this.getPlayer(id);
    return player.correctKeyPressed(key);
  }

  getPlayer (id) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id === id) {
        return this.players[i];
      }
    }
    return undefined;
  }

  updatePlayers () {
    if (this.winner) return;
    this.players.forEach(player => {
      this.findWinner(player);
    });
  }

  findWinner (player) {
    if (player.hasFinished()) {
      player.finished = true;
      const playerFinishCount = this.players.filter(p => p.finished).length;
      if (playerFinishCount === 1) {
        player.winner = true;
        this.winner = player;
        console.log(`player ${this.winner.id} won (game finished), restarting game soon`);
      }
    }
  }

  restart () {
    console.log('restarting game now');
    this.sentence = randomSentence();
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].reset(this.sentence);
    }
    delete this.winner;
    delete this.endGameCountdown;
  }
}

module.exports = GameEngine;

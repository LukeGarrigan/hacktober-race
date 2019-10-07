const Player = require('./Player');
const randomSentence = require('./randomSentence');

const PLAYER_INITIAL_Y_POSITION = 200;
const PLAYER_Y_POSITION_DELTA = 100;

class GameEngine {
  constructor () {
    this.players = [];
    this.sentence = randomSentence();
    this.winner = undefined;
    this.restartCountdown = undefined;
  }

  createNewPlayer (socketId) {
    const playersYPosition = this.players[this.players.length - 1]
      ? this.players[this.players.length - 1].y + PLAYER_Y_POSITION_DELTA
      : PLAYER_INITIAL_Y_POSITION;
    this.addPlayer(new Player(socketId, playersYPosition, this.sentence));
  }

  addPlayer (player) {
    this.players.push(player);
  }

  removePlayer (id) {
    this.players = this.players.filter(player => player.id !== id);
    this.players.forEach((player, idx) => {
      player.y = PLAYER_INITIAL_Y_POSITION + PLAYER_Y_POSITION_DELTA * idx;
    });
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
        console.log(
          `player ${this.winner.id} won (game finished), restarting game soon`
        );
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
    delete this.restartCountdown;
  }
}

module.exports = GameEngine;

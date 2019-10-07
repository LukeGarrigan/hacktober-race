import Player from './Player.js';

export default class PlayersHandler {
  constructor () {
    this.players = [];

    this.playerInitialYPosition = 200;
    this.playerYPositionDelta = 100;
  }

  updatePlayers (serverPlayers) {
    for (let i = 0; i < serverPlayers.length; i++) {
      const playerFromServer = serverPlayers[i];

      const existingPlayer = this.playerExists(playerFromServer);
      if (!existingPlayer) {

        const playersYPosition = this.playerYPositionDelta + (this.playerYPositionDelta * (this.players.length + 1));
        playerFromServer.y = playersYPosition;
        this.players.push(new Player(playerFromServer));
      } else {
        existingPlayer.currentIndex = playerFromServer.currentIndex;
        existingPlayer.finished = playerFromServer.finished;
        existingPlayer.winner = playerFromServer.winner;
        existingPlayer.currentSpeed = playerFromServer.currentSpeed;
      }
    }
  }

  playerExists (playerFromServer) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id === playerFromServer.id) {
        return this.players[i];
      }
    }
    return undefined;
  }

  removePlayer (playerId) {
    this.players = this.players.filter(player => player.id !== playerId);
    this.players.forEach((player, idx) => {
      player.y = this.playerInitialYPosition + this.playerYPositionDelta * idx;
      player.startY = this.playerInitialYPosition + this.playerYPositionDelta * idx;
    });
  }

  resetPlayers () {
    this.players = [];
  }

  draw () {
    this.players.forEach(player => player.draw());
  }

  getPlayer (id) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id === id) {
        return this.players[i];
      }
    }
    return undefined;
  }
}

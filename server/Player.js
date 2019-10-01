class Player {
  constructor(id, players) {
    this.x = 400;
    this.y = this.putPlayerBelowExistingPlayers(players);
    this.id = id;


    this.rgb = {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
    }
  }

  putPlayerBelowExistingPlayers(players) {
    return players[players.length-1] ? players[players.length-1].y + 100 : 200;
  }
}

module.exports = Player;
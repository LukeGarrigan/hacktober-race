import Player from './Player.js';

export default class PlayersHandler {
  constructor() {
    this.gameIsStarting = false;
    this.gameIsEnding = false;
    this.secondsLeft = 0;
  }

  draw() {
    if (this.secondsLeft < 0 && this.decrementInterval) {
      this.gameIsEnding = false;
      this.gameIsStarting = false;
      clearInterval(this.decrementInterval);
    }
    if (this.gameIsStarting || this.gameIsEnding) {
      fill(255);
      textSize(100);
      text(this.secondsLeft, windowWidth/2 , windowHeight/ 3);
    }

  }


  beginGameStarting() {
    this.gameIsStarting = true;
    this.secondsLeft = 10;
    this.decrementInterval = setInterval(() => this.secondsLeft--, 1000);
  }



}


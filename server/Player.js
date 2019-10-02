class Player {
  constructor(id, y, sentence) {
    this.x = 400;
    this.y = y;
    this.id = id;
    this.sentence = sentence;
    this.currentIndex = 0;

    this.rgb = {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
    }
  }

  keyPressed(key) {
    if (key === this.sentence[this.currentIndex]) {
      this.currentIndex++;
    }
  }


}

module.exports = Player;
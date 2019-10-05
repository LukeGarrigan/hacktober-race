class Player {
  constructor (id, y, sentence) {
    this.x = 400
    this.y = y
    this.id = id
    this.sentence = sentence
    this.currentIndex = 0
    this.profileImg = `https://github.com/LukeGarrigan.png`

    this.rgb = {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255
    }
  }

  reset (sentence) {
    this.sentence = sentence
    this.currentIndex = 0
    delete this.winner
    delete this.finished
  }

  correctKeyPressed (key) {
    if (key === this.sentence[this.currentIndex]) {
      this.currentIndex++
      return true
    } else {
      return false
    }
  }

  hasFinished () {
    return this.currentIndex > this.sentence.length - 1
  }
}

module.exports = Player

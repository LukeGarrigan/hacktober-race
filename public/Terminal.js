export default class Terminal {
  constructor () {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;

    this.cursorWidth = 14;
    this.cursorHeight = 6;

    this.currentIndex = 0;
    this.wrongLetter = false;

    this.resize()
  }

  draw () {
    this.drawTerminal();
    this.displayPath();
    this.drawSentence();
    this.drawCursor();
  }

  resize()
  {
    this.x = innerWidth * 0.2;
    this.y = innerHeight / 2;
    this.width = innerWidth * 0.6;
    this.height = innerHeight / 2;
  }

  updatePlayerCurrentLetter (currentIndex) {
    this.currentIndex = currentIndex;
  }

  updateSentence (newSentence) {
    this.sentence = newSentence;
  }

  drawTerminal () {
    push();
    // top of console
    this.setGradient(200, this.y - 40, innerWidth - 420, 40, color(89, 87, 79), color(62, 61, 57), 1);

    // Buttons
    fill(224, 81, 31);
    circle(innerWidth - 240, this.y - 20, 10);

    textSize(14);
    fill(61, 53, 21);
    text('x', innerWidth - 243, this.y - 16);

    // Bottom of console
    fill(45, 9, 34, 150);
    rect(200, this.y, innerWidth - 420, this.height);
    pop();
  }

  displayPath () {
    let path = 'C:\\Users\\codeheir\\hacker\\path'
    
    textSize(innerWidth/80);
    fill(100, 255, 100);
    text(path, 220, this.y + 50);

    fill(180, 180, 180);
    text(':~$', 220+textWidth(path), this.y + 50);
    textSize(innerWidth/68);
  }

  drawSentence () {
    let pathFull = 'C:\\Users\\codeheir\\hacker\\path:~$'

    if (this.sentence) {
      fill(255, 255, 255);
      text(this.sentence, 190+textWidth(pathFull), this.y + 50);

      if (this.wrongLetter && this.currentIndex + 1 < this.sentence.length - 1) {
        fill(255, 100, 100);
        text(this.sentence.substring(0, this.currentIndex + 1), 190+textWidth(pathFull), this.y + 50);
      }
      fill(100, 255, 100);
      text(this.sentence.substring(0, this.currentIndex), 190+textWidth(pathFull), this.y + 50);
    }
  }

  drawCursor () {
    let pathFull = 'C:\\Users\\codeheir\\hacker\\path:~$'

    if (this.sentence) {
      if (Math.floor(frameCount / 60) % 2 === 0) {
        const currentCharWidth = textWidth(this.sentence.charAt(this.currentIndex));
        const currentSentenceWidth = textWidth(this.sentence.substring(0, this.currentIndex));
        const cursorX = (190+textWidth(pathFull)) + currentSentenceWidth + ((currentCharWidth - this.cursorWidth) / 2);

        fill(100, 255, 100);
        rect(cursorX, (this.y + 50) + 8, this.cursorWidth, this.cursorHeight);
      }
    }
  }

  setGradient (x, y, w, h, c1, c2, axis) {
    noFill();

    if (axis === 1) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        const inter = map(i, y, y + h, 0, 1);
        const c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    } else if (axis === 2) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        const inter = map(i, x, x + w, 0, 1);
        const c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
    }
  }
}

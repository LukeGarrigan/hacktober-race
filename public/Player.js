export default class Player {
  constructor(player) {
    this.x = player.x;
    this.startX = this.x - 200;

    this.y = player.y;
    this.id = player.id;
    this.rgb = player.rgb;
    this.sentence = player.sentence;
    this.currentIndex = 0;
    this.actualXPosition = 0;
  }

  draw() {

    fill(this.rgb.r, this.rgb.g, this.rgb.b);
    this.calculateXPosition();

    circle(this.x, this.y, 30);


    push();
    this.setupLineStroke();
    this.drawLineToPlayerPosition();
    this.drawLineToMasterBranch();
    pop();

    this.drawSentence();
  }


  calculateXPosition() {
    this.actualXPosition = map(this.currentIndex, 0, this.sentence.length, 400, windowWidth - 100);
    this.x = lerp(this.x, this.actualXPosition, 0.01);
  }

  setupLineStroke() {
    strokeWeight(5);
    stroke(this.rgb.r, this.rgb.g, this.rgb.b);
  }

  drawLineToPlayerPosition() {
    line(this.startX, this.y, this.x, this.y);
  }

  drawLineToMasterBranch() {
    line(this.startX, this.y, 100, 50);
  }


  // not happy with having the sentence here, will pull it out at some point
  drawSentence() {
    fill(255, 255, 255);
    text(this.sentence, windowWidth / 4.5, windowHeight / 1.5);
  }
}
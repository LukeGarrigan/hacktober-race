export default class Player {
  constructor (player) {
    this.x = player.x;
    this.startX = this.x - 200;
    this.startY = player.y;

    this.y = player.y;
    this.id = player.id;
    this.rgb = player.rgb;
    this.sentence = player.sentence;
    this.img = createImg(player.profileImg);
    this.img.hide();

    this.currentIndex = 0;
    this.actualXPosition = 0;
    this.currentSpeed = player.currentSpeed || 0;

    this.finished = false;
    this.winner = false;
  }

  draw () {
    fill(this.rgb.r, this.rgb.g, this.rgb.b);
    this.drawLines();
    circle(this.x, this.y, 30);

    this.drawCurrentSpeed();
    // this.drawGithubImage();
  }

  drawGithubImage () {
    imageMode(CENTER);
    image(this.img, this.x, this.y, 30, 30);
  }

  drawLines () {
    push();
    this.setupLineStroke();
    if (this.winner) {
      this.doMerge();
    } else {
      this.calculateXPosition();
      this.drawLineToPlayerPosition();
    }
    this.drawLineToMasterBranch();
    pop();
  }

  calculateXPosition () {
    this.actualXPosition = map(this.currentIndex, 0, this.sentence.length, 400, windowWidth - 200);
    this.x = lerp(this.x, this.actualXPosition, 0.01);
  }

  setupLineStroke () {
    strokeWeight(5);
    stroke(this.rgb.r, this.rgb.g, this.rgb.b);
  }

  drawLineToPlayerPosition () {
    line(this.startX, this.y, this.x, this.y);
  }

  drawLineToMasterBranch () {
    line(this.startX, this.startY, 100, 50);
  }

  doMerge () {
    this.drawLineToWinnerPosition();
    if (this.x < (this.actualXPosition - 2)) {
      this.x = lerp(this.x, this.actualXPosition, 0.05);
    } else {
      this.hasReachedEnd = true;
      this.drawLineFromEndPositionToPlayer();
      this.x = lerp(this.x, windowWidth - 100, 0.05);
      this.y = lerp(this.y, 50, 0.05);
    }
  }

  drawLineToWinnerPosition () {
    if (this.hasReachedEnd) {
      line(this.startX, this.startY, windowWidth - 200, this.startY);
    } else {
      line(this.startX, this.startY, this.x, this.startY);
    }
  }

  drawLineFromEndPositionToPlayer () {
    push();
    this.setupLineStroke();
    line(windowWidth - 200, this.startY, this.x, this.y);
    pop();
  }

  drawCurrentSpeed () {
    textSize(32);
    text(`${this.currentSpeed} cps`, this.x + 55, this.y);
  }
}

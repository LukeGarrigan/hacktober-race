export default class Player {
  constructor(player) {
    this.startX = player.x - 200;

    this.x = player.x;
    this.y = player.y;
    this.id = player.id;
    this.rgb = player.rgb;
  }


  draw() {
    fill(this.rgb.r, this.rgb.g, this.rgb.b);
    circle(this.x, this.y, 30);

    push();
    strokeWeight(5);
    stroke(this.rgb.r, this.rgb.g, this.rgb.b);
    this.drawLineToPlayerPosition();
    this.drawLineToMasterBranch();
    pop();
  }


  drawLineToPlayerPosition() {
    line(this.startX, this.y, this.x, this.y);
  }

  drawLineToMasterBranch() {
    line(this.startX, this.y, 100, 50);
  }
}
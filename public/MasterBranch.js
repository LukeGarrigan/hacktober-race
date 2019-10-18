export default class MasterBranch {
  draw () {
    push();
    this.drawLine();
    this.drawFirstCircle();
    this.drawEndCircle();
    pop();
  }

  drawLine () {
    fill(100, 255, 100);
    strokeWeight(5);
    stroke(100, 255, 100);
    line(0, 50, innerWidth - 100, 50);
  }

  drawFirstCircle () {
    circle(100, 50, innerWidth/64);
  }

  drawEndCircle () {
    circle(innerWidth - 100, 50, innerWidth/64);
  }
}

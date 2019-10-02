export default class Terminal {

    constructor() {
        this.x = windowWidth * 0.2;
        this.y = windowHeight / 2;
        this.width = windowWidth * 0.6;
        this.height = windowHeight / 2;
    }


    draw() {
        this.drawTerminal();
        this.displayPath();
    }

    drawTerminal() {
        push();
        // top of console
        stroke(255, 255, 255);
        strokeWeight(1);
        fill(255,255, 255);
        rect(this.x, this.y - 40, this.width, 40);

        fill(0, 0, 0, 150);
        rect(this.x, this.y, this.width, this.height);
        pop();
    }

    displayPath() {
        textSize(40);
        fill(100, 255, 100);
        text("C:\\Users\\codeheir\\hacker\\path", this.x + 70, this.y + 100);
    }

}
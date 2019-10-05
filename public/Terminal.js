export default class Terminal {
    constructor() {
        this.x = windowWidth * 0.2;
        this.y = windowHeight / 2;
        this.width = windowWidth * 0.6;
        this.height = windowHeight / 2;

        this.cursorWidth = 14;
        this.cursorHeight = 6;

        this.currentIndex = 0;
        this.wrongLetter = false;
    }

    draw() {
        this.drawTerminal();
        this.displayPath();
        this.drawSentence();
        this.drawCursor();
    }

    updatePlayerCurrentLetter(currentIndex) {
        this.currentIndex = currentIndex;
    }

    updateSentence(newSentence){
        this.sentence = newSentence;
    }

    drawTerminal() {
        push();
        // top of console
        this.setGradient(200, this.y - 40, windowWidth - 420, 40, color(89, 87, 79), color(62, 61, 57), 1);
        
        // Buttons
        fill(224, 81, 31);
        circle(windowWidth - 240, this.y - 20, 10);

        textSize(14);
        fill(61, 53, 21);
        text("x", windowWidth - 243, this.y - 16);

        // Bottom of console
        fill(45, 9, 34, 150);
        rect(200, this.y, windowWidth - 420, this.height);
        pop();
    }

    displayPath() {
        textSize(24);
        fill(100, 255, 100);
        text("C:\\Users\\codeheir\\hacker\\path", 220, this.y + 50);

        fill(180, 180, 180);
        text(":~$", 550, this.y + 50);
        textSize(28);
    }

    drawSentence() {
        if (this.sentence) {
            fill(255, 255, 255);
            text(this.sentence, 595, this.y + 50);

            if (this.wrongLetter && this.currentIndex + 1 < this.sentence.length -1) {
                fill(255, 100, 100);
                text(this.sentence.substring(0, this.currentIndex + 1), 595, this.y + 50);
            }
            fill(100, 255, 100);
            text(this.sentence.substring(0, this.currentIndex), 595, this.y + 50);
        }
    }

    drawCursor() {
        if (this.sentence) {
            if (Math.floor(frameCount / 60) % 2 === 0) {
                let currentCharWidth = textWidth(this.sentence.charAt(this.currentIndex));
                let currentSentenceWidth = textWidth(this.sentence.substring(0, this.currentIndex));
                let cursorX = (594) + currentSentenceWidth + ((currentCharWidth - this.cursorWidth) / 2);

                fill(100, 255, 100);
                rect(cursorX, (this.y + 50) + 8, this.cursorWidth, this.cursorHeight);
            }
        }
    }

    setGradient(x, y, w, h, c1, c2, axis) {
        noFill();
        
        if (axis === 1) {
            // Top to bottom gradient
            for (let i = y; i <= y + h; i++) {
                let inter = map(i, y, y + h, 0, 1);
                let c = lerpColor(c1, c2, inter);
                stroke(c);
                line(x, i, x + w, i);
            }
        } else if (axis === 2) {
            // Left to right gradient
            for (let i = x; i <= x + w; i++) {
                let inter = map(i, x, x + w, 0, 1);
                let c = lerpColor(c1, c2, inter);
                stroke(c);
                line(i, y, i, y + h);
            }
        }
    }
}
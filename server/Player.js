class Player {
    constructor(id, y, sentence) {
        this.x = 400;
        this.y = y;
        this.id = id;
        this.sentence = sentence;
        this.currentIndex = 0;
        this.profileImg = `https://i.pravatar.cc/150?u=${id}`;
        this.joinedTime = Date.now();

        this.rgb = {
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255,
        }

    }

    correctKeyPressed(key) {
        if (key === this.sentence[this.currentIndex]) {
            this.currentIndex++;
            return true;
        } else {
            return false
        }
    }

    hasFinished() {
        return this.currentIndex > this.sentence.length - 1;
    }

    triggerEnd() {
        if (!this.finished) { // fire only once
            this.finished = true;
            this.completedTime = Date.now();
            this.completedTime - this.joinedTime;
        }
    }
}

module.exports = Player;
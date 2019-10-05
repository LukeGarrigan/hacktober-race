class Player {
    constructor(id, y, sentence) {
        this.x = 400;
        this.y = y;
        this.id = id;
        this.sentence = sentence;
        this.currentIndex = 0;
        this.profileImg = `https://i.pravatar.cc/150?u=${id}`;
        this.lastKeyTime = Date.now();
        // Characters per second
        this.currentSpeed = 0;

        this.rgb = {
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255,
        }

    }

    reset(sentence) {
        this.sentence = sentence;
        this.currentIndex = 0;
        delete this.winner;
        delete this.finished;
    }

    correctKeyPressed(key) {
        if (key === this.sentence[this.currentIndex]) {
            this.currentIndex++;
            this.onCorrectKeyPress();
            return true;
        } else {
            return false
        }
    }

    hasFinished() {
        return this.currentIndex > this.sentence.length - 1;
    }

    onCorrectKeyPress() {
        this.currentSpeed = this.calcCharPerSec();
        this.lastKeyTime = Date.now();
    }

    calcCharPerSec() {
        const msBetweenCorrectKeys = Date.now() - this.lastKeyTime;
        const cps = 1000 / msBetweenCorrectKeys;
        // Round to hundredth
        return Math.round(cps * 10) / 10;
    }
}

module.exports = Player;
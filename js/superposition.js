let angle = 0;
let video;
let handPose;
let hands = [];
const historyLength = 10;

function preload() {
    handPose = ml5.handPose({ flipped: true });
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    video = createCapture(VIDEO, { flipped: true });
    video.hide();
    video.size(innerWidth, innerHeight);
    handPose.detectStart(video, gotHands);
    // noCursor();
}

function gotHands(results) {
    hands = results;
}

let handHistories = [];

function draw() {
    clear();
    // background(220);
    // image(video, 0, 0, width, height);

    push();
    strokeWeight(4);
    stroke(255);
    setLineDash([5, 10]);
    line(100, 0, 100, innerHeight);
    line(0, innerHeight - 100, innerWidth, innerHeight - 100);
    // line(innerWidth / 2, 0, innerWidth / 2, innerHeight);
    // line(0, innerHeight / 2, innerWidth, innerHeight / 2);
    pop();

    if (hands.length > 0) {
        while (handHistories.length < hands.length) {
            handHistories.push({
                fingerHistories: Array(21).fill(null).map(() => []),
                amplitudeHistory: [],
                frequencyHistory: []
            });
        }

        let superposition = Array(500).fill(0);

        for (let h = 0; h < hands.length; h++) {
            let hand = hands[h];
            if (hand.confidence > 0.1) {
                let handHistory = handHistories[h];

                for (let i = 0; i < hand.keypoints.length; i++) {
                    let keypoint = hand.keypoints[i];
                    if (i === 8) {
                        let fingerHistory = handHistory.fingerHistories[i];
                        fingerHistory.push({ x: keypoint.x, y: keypoint.y });
                        if (fingerHistory.length > historyLength) {
                            fingerHistory.shift();
                        }

                        let smoothedFingerPos = {
                            x: average(fingerHistory.map(p => p.x)),
                            y: average(fingerHistory.map(p => p.y))
                        };

                        let newAmplitude = map(smoothedFingerPos.y, height, 0, 0, 100);
                        let newFrequency = map(smoothedFingerPos.x, 0, width, 0.0125 / 2, 0.1);

                        handHistory.amplitudeHistory.push(newAmplitude);
                        if (handHistory.amplitudeHistory.length > historyLength) {
                            handHistory.amplitudeHistory.shift();
                        }
                        let amplitude = average(handHistory.amplitudeHistory);

                        handHistory.frequencyHistory.push(newFrequency);
                        if (handHistory.frequencyHistory.length > historyLength) {
                            handHistory.frequencyHistory.shift();
                        }

                        let frequency = average(handHistory.frequencyHistory);
                        let waveColor = mapFrequencyToColor(frequency);
                        let lightnessFactor = map(amplitude, 0, 100, 0, 1);
                        let adjustedColor = lerpColor(color(255), waveColor, lightnessFactor);

                        for (let x = 0; x < 500; x++) {
                            superposition[x] += sin(x * frequency + angle) * amplitude;
                        }

                        fill(adjustedColor);
                        noStroke();
                        circle(smoothedFingerPos.x, smoothedFingerPos.y, 16);

                        push();
                        translate((innerWidth - 500) / 2, 0);
                        strokeWeight(8);
                        noFill();
                        stroke(adjustedColor);
                        beginShape();
                        for (let x = 0; x < 500; x++) {
                            let y = innerHeight / 2 + sin(x * frequency + angle) * amplitude;
                            vertex(x, y);
                        }
                        endShape();
                        pop();
                    }
                }
            }
        }

        if (hands.length > 1) {
            push();
            translate((innerWidth - 500) / 2, 0);
            drawingContext.globalCompositeOperation = 'destination-over';
            strokeWeight(8);
            noFill();
            stroke(255);
            beginShape();
            for (let x = 0; x < 500; x++) {
                let y = innerHeight / 2 + superposition[x];
                vertex(x, y);
            }
            endShape();
            pop();
        }
    }

    push();
    translate(innerWidth - 100, innerHeight - 100 - 20);
    textAlign(RIGHT);
    textSize(24);
    fill(255);
    text("Higher Frequency", 0, 0);
    pop();

    push();
    translate(100 - 20, 250);
    rotate(-HALF_PI);
    textAlign(LEFT);
    textSize(24);
    fill(255);
    text("Higher Amplitude", 0, 0);
    pop();

    angle -= 0.05;
}

function average(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function mapFrequencyToColor(freq) {
    let r = map(freq, 0.0125 / 2, 0.1, 255, 0);
    let g = 0;
    let b = map(freq, 0.0125 / 2, 0.1, 0, 255);
    return color(r, g, b);
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}


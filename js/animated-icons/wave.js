let waveSketch = function (p) {
    let angle = 0;
    let amplitude = 24;
    let circleSize = 30;
    let frequency;
    let circleColor;

    p.setup = function () {
        const canvas = p.createCanvas(200, 160);
        canvas.parent('wave');
    };

    p.draw = function () {
        frequency = p.lerp(0.05, 0.1, (p.sin(angle * 0.5) + 1) / 2);

        let startColor = p.color('#f00');
        let endColor = p.color('#09f');
        let lerpAmount = (p.sin(angle * 0.5) + 1) / 2;
        circleColor = p.lerpColor(startColor, endColor, lerpAmount);

        p.background(255);
        p.strokeWeight(4);
        p.noFill();
        p.stroke(0);
        p.beginShape();
        for (let x = 0; x < p.width; x++) {
            let y = p.height / 2 + p.sin(x * frequency + angle) * amplitude;
            p.vertex(x, y);
        }
        p.endShape();

        let circleX = p.width / 2;
        let circleY = p.height / 2 + p.sin(circleX * frequency + angle) * amplitude;
        p.noStroke();
        p.fill(circleColor);
        p.ellipse(circleX, circleY, circleSize, circleSize);

        angle += 0.05;
    };
};

new p5(waveSketch);

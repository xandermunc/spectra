let colorRects = function (p) {
    let angle = 0;
    let targetAngle = p.HALF_PI;
    let isPaused = false;
    let pauseTimer = 0;
    const pauseDuration = 1000;
    const rotationSpeed = 0.05;

    p.setup = function () {
        const canvas = p.createCanvas(100, 80);
        canvas.parent("colorRects");
    };

    p.draw = function () {
        p.clear();
        p.noStroke();

        if (!isPaused) {
            if (angle < targetAngle) {
                angle += rotationSpeed;
                if (angle >= targetAngle) {
                    angle = targetAngle;
                    isPaused = true;
                    pauseTimer = p.millis();
                }
            }
        } else {
            if (p.millis() - pauseTimer > pauseDuration) {
                isPaused = false;
                angle = 0;
            }
        }

        p.push();
        p.translate(25, 40);
        p.rotate(angle);
        p.fill("#09f");
        p.rect(-25, -25, 50, 50);
        p.pop();

        p.fill("#f90");
        p.rect(50, 15, 50, 50);

        p.stroke(0);
        p.noFill();
        p.rect(0, 0, 100, 80);
    };
};

new p5(colorRects);
let electronOrbit = function (p) {
    let angle1 = 0;
    let angle2 = Math.PI;
    let orbitRadius = 30;
    let nucleusAngle = 0;

    p.setup = function () {
        const canvas = p.createCanvas(100, 80);
        canvas.parent("electronOrbit");
    };

    p.draw = function () {
        p.clear();
        p.strokeWeight(2);

        p.push();
        p.translate(p.width / 2, p.height / 2);
        p.rotate(nucleusAngle);
        p.fill('#f00');
        p.noStroke();

        p.ellipse(-10 / 4 * 3, -10 / 4 * 3, 15, 15);
        p.ellipse(10 / 4 * 3, 10 / 4 * 3, 15, 15);

        p.noFill();
        p.stroke('black');
        p.ellipse(-10 / 4 * 3, 10 / 4 * 3, 15, 15);
        p.ellipse(10 / 4 * 3, -10 / 4 * 3, 15, 15);
        p.pop();

        p.noFill();
        p.stroke('black');
        p.ellipse(p.width / 2, p.height / 2, orbitRadius * 2, orbitRadius * 2);

        let electronX1 = p.width / 2 + orbitRadius * p.cos(angle1);
        let electronY1 = p.height / 2 + orbitRadius * p.sin(angle1);

        let electronX2 = p.width / 2 + orbitRadius * p.cos(angle2);
        let electronY2 = p.height / 2 + orbitRadius * p.sin(angle2);

        p.fill('#09f');
        p.noStroke();
        p.ellipse(electronX1, electronY1, 10, 10);
        p.ellipse(electronX2, electronY2, 10, 10);

        angle1 += 0.05;
        angle2 += 0.05;
        nucleusAngle -= 0.0125;
    };
};

new p5(electronOrbit);
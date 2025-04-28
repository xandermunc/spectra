let superposition = function (p) {
    let angle1 = 0;
    let angle2 = 0;
    let amplitude = 24;
    let frequency = 0.05;
    let frequency2 = 0.05;

    p.setup = function () {
        const canvas = p.createCanvas(200, 160);
        canvas.parent("superposition");
    };

    p.draw = function () {
        frequency2 = p.lerp(0.05, 0.1, (p.sin(angle2 * 0.25) + 1) / 2);
        p.clear();
        p.strokeWeight(4);
        p.noFill();

        p.stroke('#09f');
        p.beginShape();
        for (let x = 0; x < p.width; x++) {
            let y = p.height / 2 + p.sin(x * frequency + angle1) * amplitude;
            p.vertex(x, y);
        }
        p.endShape();

        p.stroke('#f00');
        p.beginShape();
        for (let x = 0; x < p.width; x++) {
            let y = p.height / 2 + p.sin(x * frequency2 + angle2 + p.PI) * amplitude;
            p.vertex(x, y);
        }
        p.endShape();

        p.stroke(0);
        p.beginShape();
        for (let x = 0; x < p.width; x++) {
            let y1 = p.sin(x * frequency + angle1) * amplitude;
            let y2 = p.sin(x * frequency2 + angle2 + p.PI) * amplitude;
            let ySuperposition = p.height / 2 + (y1 + y2);
            p.vertex(x, ySuperposition);
        }
        p.endShape();

        angle1 += 0.03;
        angle2 += 0.05;
    };
};

new p5(superposition); 

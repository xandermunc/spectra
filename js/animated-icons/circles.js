let circles = function (p) {
    let orbitRadius = 60;
    let offset = 0;
    let separationSpeed = 0.04;
    let maxSeparation = 20;
    let useGroup1 = true;
    let time = 0;
    let switchInterval = Math.PI;
    let switchColorInterval = Math.PI * 2;
    let switchColor = "#09f";
    let colorState = 0;

    p.setup = function () {
        const canvas = p.createCanvas(200, 160);
        canvas.parent("circles2");
    };

    p.draw = function () {
        p.clear();
        p.noFill();
        p.strokeWeight(4);

        time += separationSpeed;
        offset = Math.sin(time) * maxSeparation;
        if (time % switchInterval < separationSpeed) {
            useGroup1 = !useGroup1;
        }

        if (time % switchColorInterval < separationSpeed) {
            colorState = (colorState + 1) % 2;
            switch (colorState) {
                case 0:
                    switchColor = "#09f";
                    break;
                case 1:
                    switchColor = "#f00";
                    break;
            }
        }

        if (useGroup1) {
            // Animation group 1
            p.stroke('black');
            p.ellipse(p.width / 2 - offset, p.height / 2, orbitRadius * 2, orbitRadius * 2);
            p.ellipse(p.width / 2 + offset, p.height / 2, orbitRadius * 2, orbitRadius * 2);
        } else {
            // Animation group 2
            p.stroke(switchColor);
            p.ellipse(p.width / 2, p.height / 2, orbitRadius * 2, orbitRadius * 2);
            p.stroke('black');
            p.ellipse(p.width / 2 - offset * 1.6, p.height / 2, orbitRadius * 2, orbitRadius * 2);
            p.ellipse(p.width / 2 + offset * 1.6, p.height / 2, orbitRadius * 2, orbitRadius * 2);
        }
    };
};

new p5(circles);
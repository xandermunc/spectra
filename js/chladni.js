const chladniSketch = (p) => {
    let particles = [];
    let num = 5000;
    let m = 5, n = 4;
    let threshold = 0.05;
    let minMN = 1, maxMN = 6;
    let changePattern = true;
    let margin = 50;
    let w1, w2, h1, h2;
    let scl = 1;

    class Particle {
        constructor() {
            this.position = p.createVector(p.random(w1, w2), p.random(h1, h2));
            this.velocity = p5.Vector.random2D();
            this.acceleration = p.createVector();
            this.maxSpeed = 4;
            this.maxForce = 0.4;
        }

        edges() {
            if (this.position.x > w2) this.position.x = w1;
            else if (this.position.x < w1) this.position.x = w2;
            if (this.position.y > h2) this.position.y = h1;
            else if (this.position.y < h1) this.position.y = h2;
        }

        seek() {
            let x = p.map(this.position.x, w1, w2, -1, 1) * scl;
            let y = p.map(this.position.y, h1, h2, -1, 1) * scl;
            let val = chladni(x, y);
            let target = this.position.copy();
            if (p.abs(val) > threshold) {
                target.x += p.random(-3, 3);
                target.y += p.random(-3, 3);
            }
            let desired = p5.Vector.sub(target, this.position);
            desired.setMag(this.maxSpeed);
            let steering = p5.Vector.sub(desired, this.velocity);
            steering.limit(this.maxForce);
            return steering;
        }

        update() {
            this.edges();
            this.acceleration.add(this.seek());
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.maxSpeed);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
        }

        display() {
            let distanceX = p.abs(this.position.x - p.width / 2);
            let distanceY = p.abs(this.position.y - p.height / 2);
            let maxDistX = (p.width / 2) * 1;
            let maxDistY = (p.height / 2) * 0.5;

            let distance = p.sqrt(p.sq(distanceX / maxDistX) + p.sq(distanceY / maxDistY));

            let alpha = p.map(distance, 0, 1, 255, 0);
            alpha = p.constrain(alpha, 0, 255);

            p.stroke(0, 0, 0, alpha);
            p.strokeWeight(2);
            p.point(this.position.x, this.position.y);
        }

    }

    function chladni(x, y) {
        let L = 1;
        return p.cos(n * p.PI * x / L) * p.cos(m * p.PI * y / L) -
            p.cos(m * p.PI * x / L) * p.cos(n * p.PI * y / L);
    }

    function randomPatterns() {
        m = p.floor(p.random(minMN, maxMN));
        n = p.floor(p.random(minMN, maxMN));
        if (m === n) {
            m = p.floor(p.random(minMN, maxMN));
        }
        changePattern = false;
        for (let i = 0; i < particles.length; i++) {
            particles[i].velocity = p5.Vector.random2D().mult(p.random(2, 5));
        }
    }

    p.setup = () => {
        let canvas = p.createCanvas(innerWidth, innerWidth);
        p.createCanvas(innerWidth, innerWidth).parent("chladni").style("display", "block").style("margin", "0 auto");
        canvas.parent('chladni');
        w1 = margin;
        w2 = p.width - margin;
        h1 = margin;
        h2 = p.height - margin;
        for (let i = 0; i < num; i++) {
            particles.push(new Particle());
        }
        m = 3; n = 4;
    };

    p.draw = () => {
        p.clear();
        if (changePattern) {
            randomPatterns();
        }
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].display();
        }
    };

    p.keyPressed = () => {
        changePattern = true;
    };
};

new p5(chladniSketch, 'chladni');

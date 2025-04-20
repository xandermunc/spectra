let menuIcon = function (p) {
    let topLineY = 4;
    let bottomLineY = 16;
    let originalTopLineY = 4;
    let originalBottomLineY = 16;
    let parentDivHovered = false;
    let transitionSpeed = 0.2;
    let lineMoveSpeed = 0.1;
    let middleLineLength = 20;
    let expandedMiddleLineLength = 40;
    let currentMiddleLineLength = middleLineLength;
    let waveAmplitude = 0;
    let wavePhase = 0;
    let frequency = 2;

    p.setup = function () {
        const canvas = p.createCanvas(40, 20);
        canvas.parent('menu-icon');
        const parentDiv = document.getElementById('menu-icon-div');
        parentDiv.addEventListener('mouseenter', () => parentDivHovered = true);
        parentDiv.addEventListener('mouseleave', () => parentDivHovered = false);
    };

    p.draw = function () {
        p.clear();
        p.strokeWeight(1.5);
        p.strokeCap(p.ROUND);

        if (parentDivHovered) {
            topLineY = p.lerp(topLineY, 10, lineMoveSpeed);
            bottomLineY = p.lerp(bottomLineY, 10, lineMoveSpeed);
            waveAmplitude = p.lerp(waveAmplitude, 3, transitionSpeed);
        } else {
            topLineY = p.lerp(topLineY, originalTopLineY, lineMoveSpeed);
            bottomLineY = p.lerp(bottomLineY, originalBottomLineY, lineMoveSpeed);
            waveAmplitude = p.lerp(waveAmplitude, 0, transitionSpeed);
        }

        currentMiddleLineLength = p.lerp(currentMiddleLineLength, parentDivHovered ? expandedMiddleLineLength : middleLineLength, transitionSpeed);

        let sineWave = [];
        for (let i = 0; i < currentMiddleLineLength; i++) {
            let sineY = 10 + waveAmplitude * p.sin(frequency * p.TWO_PI * (i / currentMiddleLineLength) + wavePhase);
            sineWave.push({ x: i, y: sineY });
        }

        wavePhase += 0.05;

        let topOpacity = p.map(p.abs(topLineY - 10), 0, 6, 0, 255);
        let bottomOpacity = p.map(p.abs(bottomLineY - 10), 0, 6, 0, 255);

        let topOffsetX = (p.width - middleLineLength) / 2;
        p.stroke(0, 0, 0, topOpacity);
        p.line(topOffsetX, topLineY, topOffsetX + middleLineLength, topLineY);

        p.stroke(0);
        for (let i = 0; i < sineWave.length - 1; i++) {
            let start = sineWave[i];
            let end = sineWave[i + 1];
            p.line(start.x + (p.width - currentMiddleLineLength) / 2, start.y, end.x + (p.width - currentMiddleLineLength) / 2, end.y);
        }

        let bottomOffsetX = (p.width - middleLineLength) / 2;
        p.stroke(0, 0, 0, bottomOpacity);
        p.line(bottomOffsetX, bottomLineY, bottomOffsetX + middleLineLength, bottomLineY);
    };
};

new p5(menuIcon);

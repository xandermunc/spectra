let spectroscopy = function (p) {
    let height = 80;
    let progress = 0; 
    let duration = 100;
    let direction = 1;
    let currentSet = 0;

    const colorSets = [
        { start: [656, 486, 434, 410], end: [566, 649, 450, 500] },
        { start: [566, 649, 450, 500], end: [607, 680, 538, 430] },
        { start: [607, 680, 538, 430], end: [656, 486, 434, 410] }
    ];

    // 430 
    // 538


    p.setup = function () {
        const canvas = p.createCanvas(100, 80);
        canvas.parent("spectroscopy");
    };

    p.draw = function () {
        p.clear();
        p.strokeWeight(2);
        p.stroke('black');
        p.strokeCap(p.ROUND);
        p.line(0, height / 2, 100, height / 2);
        p.line(1, height / 2 + 15 / 2, 1, height / 2 - 15 / 2);
        p.line(99, height / 2 + 15 / 2, 99, height / 2 - 15 / 2);

        const { start, end } = colorSets[currentSet];

        let start1 = p.map(start[0], 400, 700, 0, p.width);
        let start2 = p.map(start[1], 400, 700, 0, p.width);
        let start3 = p.map(start[2], 400, 700, 0, p.width);
        let start4 = p.map(start[3], 400, 700, 0, p.width);

        let end1 = p.map(end[0], 400, 700, 0, p.width);
        let end2 = p.map(end[1], 400, 700, 0, p.width);
        let end3 = p.map(end[2], 400, 700, 0, p.width);
        let end4 = p.map(end[3], 400, 700, 0, p.width);

        let easedProgress = (1 - Math.cos(progress * Math.PI)) / 2;

        let colorValue1 = p.lerp(start1, end1, easedProgress);
        let colorValue2 = p.lerp(start2, end2, easedProgress);
        let colorValue3 = p.lerp(start3, end3, easedProgress);
        let colorValue4 = p.lerp(start4, end4, easedProgress);

        let startColor1 = wavelengthToHex(start[0]);
        let startColor2 = wavelengthToHex(start[1]);
        let startColor3 = wavelengthToHex(start[2]);
        let startColor4 = wavelengthToHex(start[3]);

        let endColor1 = wavelengthToHex(end[0]);
        let endColor2 = wavelengthToHex(end[1]);
        let endColor3 = wavelengthToHex(end[2]);
        let endColor4 = wavelengthToHex(end[3]);

        let interpolatedColor1 = interpolateColor(startColor1, endColor1, easedProgress);
        let interpolatedColor2 = interpolateColor(startColor2, endColor2, easedProgress);
        let interpolatedColor3 = interpolateColor(startColor3, endColor3, easedProgress);
        let interpolatedColor4 = interpolateColor(startColor4, endColor4, easedProgress);

        p.stroke(interpolatedColor1);
        p.line(colorValue1, 10, colorValue1, 70);
        p.stroke(interpolatedColor2);
        p.line(colorValue2, 10, colorValue2, 70);
        p.stroke(interpolatedColor3);
        p.line(colorValue3, 10, colorValue3, 70);
        p.stroke(interpolatedColor4);
        p.line(colorValue4, 10, colorValue4, 70);

        progress += direction * (1 / duration);

        if (progress >= 1) {
            progress = 0;
            currentSet = (currentSet + 1) % colorSets.length;
        }

        // p.stroke(0);
        // p.noFill();
        // p.rect(0,0,100,80);
    };

    function wavelengthToHex(wavelength) {
        let r = 0, g = 0, b = 0;

        if (wavelength >= 380 && wavelength < 440) {
            r = -(wavelength - 440) / (440 - 380);
            g = 0;
            b = 1;
        } else if (wavelength >= 440 && wavelength < 490) {
            r = 0;
            g = (wavelength - 440) / (490 - 440);
            b = 1;
        } else if (wavelength >= 490 && wavelength < 510) {
            r = 0;
            g = 1;
            b = -(wavelength - 510) / (510 - 490);
        } else if (wavelength >= 510 && wavelength < 580) {
            r = (wavelength - 510) / (580 - 510);
            g = 1;
            b = 0;
        } else if (wavelength >= 580 && wavelength < 645) {
            r = 1;
            g = -(wavelength - 645) / (645 - 580);
            b = 0;
        } else if (wavelength >= 645 && wavelength <= 700) {
            r = 1;
            g = 0;
            b = 0;
        }

        let factor = 1.0;
        if (wavelength >= 380 && wavelength < 420) {
            factor = 0.3 + 0.7 * (wavelength - 380) / (420 - 380);
        } else if (wavelength >= 645 && wavelength <= 700) {
            factor = 0.3 + 0.7 * (700 - wavelength) / (700 - 645);
        }

        r = Math.round(r * factor * 255);
        g = Math.round(g * factor * 255);
        b = Math.round(b * factor * 255);

        return p.color(r, g, b).toString('#rrggbb');
    }

    function interpolateColor(startColor, endColor, t) {
        let start = p.color(startColor);
        let end = p.color(endColor);

        let r = p.lerp(p.red(start), p.red(end), t);
        let g = p.lerp(p.green(start), p.green(end), t);
        let b = p.lerp(p.blue(start), p.blue(end), t);

        return p.color(r, g, b);
    }
};

new p5(spectroscopy);
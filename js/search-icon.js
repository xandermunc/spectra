let sketch = (p) => {
  let selected = false;
  let lensWidth = 16;
  const lensHeight = 16;
  const normalWidth = 16;
  const pillWidth = 32;
  const transitionSpeed = 0.2;
  let handleOpacity = 255;
  let targetOpacity = 255;
  let isHovering = false;

  p.setup = function () {
    p.pixelDensity(2);
    const canvas = p.createCanvas(35, 50);
    canvas.parent('search-icon');

    canvas.mousePressed(() => {
      selected = !selected;
    });

    canvas.mouseOver(() => {
      isHovering = true;
    });

    canvas.mouseOut(() => {
      isHovering = false;
    });
  };

  p.draw = function () {
    p.clear();
    p.translate(p.width / 2, p.height / 2);
    p.noFill();
    p.stroke(0);
    p.strokeWeight(2);

    let targetWidth;
    if (selected) {
      targetWidth = pillWidth;
    } else if (isHovering) {
      targetWidth = pillWidth;
    } else {
      targetWidth = normalWidth;
    }

    lensWidth = p.lerp(lensWidth, targetWidth, transitionSpeed);

    targetOpacity = (isHovering || selected) ? 0 : 255;

    handleOpacity = p.lerp(handleOpacity, targetOpacity, transitionSpeed);

    p.rectMode(p.CENTER);
    p.strokeJoin(p.ROUND);
    p.rect(0, 0, lensWidth, lensHeight, lensHeight / 2);

    if (!selected) {
      p.stroke(0, 0, 0, handleOpacity);
      p.line(6, 6, 10, 10);
    }
  };
};

new p5(sketch);

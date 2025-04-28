for (let i = 0; i <= steps; i++) {
    const t = tMin + (tMax - tMin) * (i / steps);
    const x = funcX(t) * scaleX + translateX;
    const y = funcY(t) * scaleY * -1 + translateY;

    if (i === 0) {
        d += `M ${x} ${y}`;
    } else {
        const prevT = tMin + (tMax - tMin) * ((i - 1) / steps);
        const prevX = funcX(prevT) * scaleX + translateX;
        const prevY = funcY(prevT) * scaleY * -1 + translateY;

        // Control points for the curve
        const cp1X = (prevX + x) / 2;
        const cp1Y = prevY;
        const cp2X = (prevX + x) / 2;
        const cp2Y = y;

        d += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${x} ${y}`;
    }
}
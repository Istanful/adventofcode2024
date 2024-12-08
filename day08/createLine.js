const createLine = (a, b) => {
  const deltaX = b.x - a.x;
  const deltaY = b.y - a.y;
  const k = deltaY / deltaX;
  const m = a.y - k * a.x;
  const isVertical = deltaX === 0;

  return {
    isVertical,
    verticalAtY: (y) => {
      return {
        y,
        x: a.x,
      };
    },
    atX: (x) => {
      return {
        x,
        y: Math.round(k * x + m),
      };
    },
  };
};
exports.createLine = createLine;

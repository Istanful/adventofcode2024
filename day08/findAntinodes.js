const { createLine } = require("./createLine");
const isInBounds = require("./isInBounds");

module.exports = function findAntinodes(a, b, boardSize) {
  const deltaX = b.x - a.x;
  const deltaY = b.y - a.y;
  const line = createLine(a, b);

  if (a.frequency !== b.frequency) {
    return [];
  }

  if (a.x === b.x && a.y === b.y) {
    return [];
  }

  if (line.isVertical) {
    return [
      line.verticalAtY(a.y - deltaY),
      line.verticalAtY(b.y + deltaY),
    ].filter((node) => isInBounds(boardSize, node));
  }

  return [line.atX(a.x - deltaX), line.atX(b.x + deltaX)].filter((node) =>
    isInBounds(boardSize, node)
  );
};

exports.isInBounds = isInBounds;

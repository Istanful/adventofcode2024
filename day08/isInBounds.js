module.exports = function isInBounds(boardSize, node) {
  return (
    node.x >= 0 && node.x < boardSize.x && node.y >= 0 && node.y < boardSize.y
  );
};

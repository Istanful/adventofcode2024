module.exports = function parseInput(input) {
  const boardSize = {
    x: 0,
    y: 0,
  };

  const lines = input.trim().split("\n");
  boardSize.y = lines.length;
  const antennas = lines.flatMap((line, y) => {
    const chars = line.split("");
    boardSize.x = line.length;
    return chars.flatMap((char, x) => {
      if (char === ".") {
        return [];
      }

      return {
        frequency: char,
        x,
        y,
      };
    });
  });

  return {
    boardSize,
    antennas,
  };
};

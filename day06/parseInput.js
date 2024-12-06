function parseInput(input) {
  let result = { boardSize: { x: 0, y: 0 }, obstacles: [], guard: null };
  const rows = input.trim().split("\n");
  result.boardSize.y = rows.length;

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];
    const chars = row.split("");
    result.boardSize.x = chars.length;

    for (let x = 0; x < chars.length; x++) {
      const char = chars[x];

      switch (char) {
        case "#":
          result.obstacles.push({ x, y, type: char });
          break;
        case "^":
          result.guard = { x, y, type: char, direction: { x: 0, y: -1 } };
      }
    }
  }

  return result;
}
exports.parseInput = parseInput;

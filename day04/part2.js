const example = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

console.assert(solve(example) === 9, `Expected 9 got ${solve(example)}`);

function solve(input) {
  const tokenLength = 4;
  const searchTokens = ["MAS", "SAM"];
  const lines = input.trim().split("\n");
  let count = 0;

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    const chars = line.split("");

    for (let x = 0; x < chars.length; x++) {
      const diag1Token = [
        lines[y - 1]?.[x - 1],
        lines[y][x],
        lines[y + 1]?.[x + 1],
      ]
        .filter(Boolean)
        .join("");
      const diag2Token = [
        lines[y + 1]?.[x - 1],
        lines[y][x],
        lines[y - 1]?.[x + 1],
      ]
        .filter(Boolean)
        .join("");

      const isMatch =
        searchTokens.includes(diag1Token) && searchTokens.includes(diag2Token);

      if (isMatch) {
        count += 1;
      }
    }
  }

  return count;
}

module.exports = solve;

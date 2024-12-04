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

console.assert(solve(example) === 18, `Expected 18 got ${solve(example)}`);

function solve(input) {
  const tokenLength = 4;
  const searchTokens = ["XMAS", "SAMX"];
  const lines = input.trim().split("\n");
  let count = 0;

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    const chars = line.split("");

    for (let x = 0; x < chars.length; x++) {
      const horizontalToken = line.substr(x, tokenLength);
      const verticalToken = [
        lines[y][x],
        lines[y + 1]?.[x],
        lines[y + 2]?.[x],
        lines[y + 3]?.[x],
      ]
        .filter(Boolean)
        .join("");
      const diag1Token = [
        lines[y][x],
        lines[y + 1]?.[x + 1],
        lines[y + 2]?.[x + 2],
        lines[y + 3]?.[x + 3],
      ]
        .filter(Boolean)
        .join("");
      const diag2Token = [
        lines[y][x],
        lines[y - 1]?.[x + 1],
        lines[y - 2]?.[x + 2],
        lines[y - 3]?.[x + 3],
      ]
        .filter(Boolean)
        .join("");
      const tokens = [horizontalToken, verticalToken, diag1Token, diag2Token];

      searchTokens.forEach((searchToken) => {
        for (let token of tokens) {
          if (token === searchToken) {
            count++;
          }
        }
      });
    }
  }

  return count;
}

module.exports = solve;


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

function bm(name, func, repeatCount = 100) {
  const startedAt = new Date();
  let result;

  for (let i = 0; i < repeatCount; i++) {
    result = func();
  }

  const stoppedAt = new Date();
  const elapsedtime = stoppedAt.getTime() - startedAt.getTime();
  console.log(
    `${name} took ${elapsedtime}ms (avg ${elapsedtime / repeatCount}ms)`
  );
  return result;
}

function solve1(input) {
  const tokenLength = 4;
  const searchTokens = ["XMAS", "SAMX"];
  const lines = input.trim().split("\n");
  let count = 0;
  let horCount = 0;
  let vertCount = 0;
  let diagCount = 0;
  let diagCount1 = 0;

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

      searchTokens.forEach((searchToken, i) => {
        for (let token of tokens) {
          if (token === searchToken) {
            count++;
            switch (tokens.indexOf(token)) {
              case 0:
                horCount++;
                continue;
              case 1:
                vertCount++;
                continue;
              case 2:
                diagCount++;
                continue;
              case 3:
                diagCount1++;
                continue;
            }
          }
        }
      });
    }
  }
  // console.log("solution 1", { horCount, vertCount, diagCount, diagCount1 });

  return count;
}

function solve2(input) {
  let horCount = 0;
  let vertCount = 0;
  let diagCount = 0;
  let diagCount1 = 0;

  const trimmedInput = input.trim();
  let found = 0;
  let y = 0;
  let x = 0;
  const createWalker = (needle) => {
    let buffer = needle;

    return {
      reset: () => {
        buffer = needle;
      },
      buffer,
      walk: (char) => {
        buffer = buffer[char];

        if (buffer === undefined) {
          buffer = needle[char] ?? needle;
          return 0;
        }

        if (buffer === true) {
          buffer = needle[char] ?? needle;
          return 1;
        }

        return 0;
      },
    };
  };
  const forwardNeedle = { X: { M: { A: { S: true } } } };
  const backwardNeedle = { S: { A: { M: { X: true } } } };
  const horForward = createWalker(forwardNeedle);
  const horBackward = createWalker(backwardNeedle);
  const verForward = {};
  const verBackward = {};
  const diagRightForward = {
    0: { 0: createWalker(forwardNeedle) },
  };
  const diagRightBackward = {
    0: { 0: createWalker(backwardNeedle) },
  };
  const diagLeftForward = {
    0: { 0: createWalker(forwardNeedle) },
  };
  const diagLeftBackward = {
    0: { 0: createWalker(backwardNeedle) },
  };

  for (let i = 0; i < trimmedInput.length; i++) {
    const char = trimmedInput[i];

    switch (char) {
      case "\n": {
        x = 0;
        y += 1;
        horForward.reset();
        horBackward.reset();

        diagRightForward[x] = diagRightForward[x];
        diagRightBackward[x] = diagRightBackward[x];
      }
      case "X":
      case "M":
      case "A":
      case "S": {
        verForward[x] = verForward[x] ?? createWalker(forwardNeedle);
        verBackward[x] = verBackward[x] ?? createWalker(backwardNeedle);

        if (x - y >= 0) {
          diagRightForward[x - y] ??= {};
          diagRightForward[x - y][0] =
            diagRightForward[x - y]?.[0] ?? createWalker(forwardNeedle);
          found += diagRightForward[x - y][0].walk(char);

          diagRightBackward[x - y] ??= {};
          diagRightBackward[x - y][0] =
            diagRightBackward[x - y]?.[0] ?? createWalker(backwardNeedle);
          found += diagRightBackward[x - y][0].walk(char);
        } else {
          diagRightForward[x] ??= {};
          diagRightForward[x][y] =
            diagRightForward[x]?.[y] ?? createWalker(forwardNeedle);
          found += diagRightForward[x][y].walk(char);

          diagRightBackward[x] ??= {};
          diagRightBackward[x][y] =
            diagRightBackward[x]?.[y] ?? createWalker(backwardNeedle);
          found += diagRightBackward[x][y].walk(char);
        }

        if (y === 0) {
          diagLeftForward[x] ??= {};
          diagLeftForward[x][y] = createWalker(forwardNeedle);
          found += diagLeftForward[x][y].walk(char);

          diagLeftBackward[x] ??= {};
          diagLeftBackward[x][y] = createWalker(backwardNeedle);
          found += diagLeftBackward[x][y].walk(char);
        } else if (!diagLeftForward[x + y]?.[0]) {
          diagLeftForward[x] ??= {};
          diagLeftForward[x][y] =
            diagLeftForward[x][y] ?? createWalker(forwardNeedle);
          found += diagLeftForward[x][y].walk(char);

          diagLeftBackward[x] ??= {};
          diagLeftBackward[x][y] =
            diagLeftForward[x][y] ?? createWalker(backwardNeedle);
          found += diagLeftBackward[x][y].walk(char);
        } else {
          found += diagLeftForward[x + y][0].walk(char);
          found += diagLeftBackward[x + y][0].walk(char);
        }

        found += verForward[x].walk(char);
        found += verBackward[x].walk(char);

        const horaFound = horForward.walk(char);
        found += horaFound;
        horCount += horaFound;

        const horbFound = horBackward.walk(char);
        found += horbFound;
        horCount += horbFound;

        x += 1;
      }
    }
  }

  return found;
}

function solve(input) {
  return solve1(input);
}

module.exports = solve;

const { parseInput } = require("./parseInput");
const { raycast } = require("./raycast");

const example = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`;

const guardDirections = {
  "0,-1": { x: 1, y: 0 },
  "1,0": { x: 0, y: 1 },
  "0,1": { x: -1, y: 0 },
  "-1,0": { x: 0, y: -1 },
};

function assertEquals(actual, expected) {
  console.assert(actual === expected, `Expected ${expected} but got ${actual}`);
}

assertEquals(solve(example), 42);

function solve(input) {
  const { boardSize, obstacles, guard } = parseInput(input);
  const visited = new Set();

  let raycastHit = raycast(guard, guard.direction, obstacles);

  while (raycastHit) {
    let pos = {
      x: guard.x + guard.direction.x,
      y: guard.y + guard.direction.y,
    };

    while (pos.x !== raycastHit.x || pos.y !== raycastHit.y) {
      visited.add(JSON.stringify(pos));
      pos = { x: pos.x + guard.direction.x, y: pos.y + guard.direction.y };
    }

    guard.x = pos.x - guard.direction.x;
    guard.y = pos.y - guard.direction.y;
    guard.direction =
      guardDirections[`${guard.direction.x},${guard.direction.y}`];

    raycastHit = raycast(guard, guard.direction, obstacles);
  }

  let pos = {
    x: guard.x + guard.direction.x,
    y: guard.y + guard.direction.y,
  };

  while (
    pos.x >= 0 &&
    pos.x < boardSize.x &&
    pos.y >= 0 &&
    pos.y < boardSize.y
  ) {
    visited.add(JSON.stringify(pos));
    pos = { x: pos.x + guard.direction.x, y: pos.y + guard.direction.y };
  }

  return visited.size + 1;
}

assertEquals(
  JSON.stringify(
    raycast({ x: 0, y: 0 }, { x: 1, y: 0 }, [
      { x: 2, y: 0 },
      { x: 1, y: 0 },
    ])
  ),
  '{"x":1,"y":0}'
);

assertEquals(
  raycast({ x: 0, y: 1 }, { x: 0, y: 1 }, [{ x: 0, y: 0 }]),
  undefined
);

assertEquals(
  raycast({ x: 0, y: 1 }, { x: 0, y: -1 }, [{ x: 0, y: 2 }]),
  undefined
);

assertEquals(
  raycast({ x: 1, y: 0 }, { x: 1, y: 0 }, [{ x: 0, y: 0 }]),
  undefined
);

module.exports = solve;

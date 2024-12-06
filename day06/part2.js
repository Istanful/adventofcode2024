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

assertEquals(solve(example), 6);

assertEquals(
  traceWalk({
    boardSize: { x: 4, y: 4 },
    guard: {
      x: 1,
      y: 2,
      direction: { x: 0, y: -1 },
    },
    obstacles: [
      { x: 1, y: 0 },
      { x: 3, y: 1 },
      { x: 2, y: 3 },
      { x: 0, y: 2 },
    ],
  }).looping,
  true
);

function solve(input) {
  const { boardSize, obstacles, guard } = parseInput(input);
  let solutions = new Set();
  const { visited } = traceWalk({ boardSize, obstacles, guard });

  for (let obstaclePos of visited) {
    const newObstacles = [
      ...obstacles,
      {
        x: obstaclePos.x,
        y: obstaclePos.y,
        type: "#",
      },
    ];

    const result = traceWalk({
      obstacles: newObstacles,
      boardSize,
      guard: clone(guard),
    });

    if (result.looping) {
      solutions.add(`${obstaclePos.x},${obstaclePos.y}`);
    }
  }

  return solutions.size;
}

function traceWalk({ boardSize, obstacles, guard }) {
  guard = clone(guard);
  const stopPositions = [];
  const visited = [];

  let raycastHit = raycast(guard, guard.direction, obstacles);
  let iterCount = 0;

  while (raycastHit) {
    let pos = {
      x: guard.x + guard.direction.x,
      y: guard.y + guard.direction.y,
    };

    while (pos.x !== raycastHit.x || pos.y !== raycastHit.y) {
      visited.push({ x: pos.x, y: pos.y });
      pos = { x: pos.x + guard.direction.x, y: pos.y + guard.direction.y };
    }

    guard.x = pos.x - guard.direction.x;
    guard.y = pos.y - guard.direction.y;
    const stopPosition = {
      x: guard.x,
      y: guard.y,
      direction: { ...guard.direction },
    };

    if (
      stopPositions.find(
        (p) =>
          p.x === stopPosition.x &&
          p.y === stopPosition.y &&
          p.direction.x === stopPosition.direction.x &&
          p.direction.y === stopPosition.direction.y
      )
    ) {
      return {
        looping: true,
        visited,
      };
    }

    stopPositions.push(stopPosition);
    guard.direction =
      guardDirections[`${guard.direction.x},${guard.direction.y}`];

    raycastHit = raycast(guard, guard.direction, obstacles);
    iterCount++;
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
    visited.push({ x: pos.x, y: pos.y });
    pos = { x: pos.x + guard.direction.x, y: pos.y + guard.direction.y };
  }
  stopPositions.push({
    x: pos.x - guard.direction.x,
    y: pos.y - guard.direction.y,
    direction: { ...guard.direction },
  });

  return {
    looping: false,
    stopPositions,
    visited,
  };
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

module.exports = solve;


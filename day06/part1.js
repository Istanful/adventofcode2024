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

function raycast(source, direction, targets) {
  let hits = [];
  let k = direction.y / direction.x;
  let isVertical = direction.x === 0;

  const m = source.y - k * source.x;

  for (let target of targets) {
    if (!isVertical) {
      const isHit = target.x * k + m === target.y;
      const hitDir = {
        x: Math.sign(target.x - source.x),
        y: Math.sign(target.y - source.y),
      };

      if (isHit && hitDir.x === direction.x && hitDir.y === direction.y) {
        hits.push(target);
      }

      continue;
    }

    if (direction.y > 0) {
      const isHit = target.x === source.x && target.y > source.y;

      if (isHit) {
        hits.push(target);
      }

      continue;
    }

    const isHit = target.x === source.x && target.y < source.y;
    if (isHit) {
      hits.push(target);
    }
  }

  const closest = hits.sort((a, b) => {
    const aDistance = Math.abs(a.x - source.x) + Math.abs(a.y - source.y);
    const bDistance = Math.abs(b.x - source.x) + Math.abs(b.y - source.y);
    return aDistance - bDistance;
  })[0];

  return closest;
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

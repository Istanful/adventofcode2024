const parseInput = require("./parseInput");
const { createLine } = require("./createLine");
const isInBounds = require("./isInBounds");

function solve(input) {
  const { antennas, boardSize } = parseInput(input);
  const antennasByFrequency = antennas.reduce((acc, antenna) => {
    return {
      ...acc,
      [antenna.frequency]: [...(acc[antenna.frequency] ?? []), antenna],
    };
  }, {});

  const locations = Object.values(antennasByFrequency).reduce((loc, as) => {
    return as.reduce((accA, a) => {
      return as.reduce((accB, b) => {
        const nodes = findAntinodes(a, b, boardSize, { max: null });
        nodes.forEach((n) => loc.add(`${n.x},${n.y}`));
        return accB;
      }, accA);
    }, loc);
  }, new Set());

  return locations.size;
}

function findAntinodes(a, b, boardSize) {
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
    let nodes = [];

    for (let y = a.y; y < boardSize.y; y += deltaY) {
      const node = line.verticalAtY(y);

      if (node.y === a.y) {
        continue;
      }

      nodes.push(node);
    }

    for (let y = a.y; y >= 0; y -= deltaY) {
      const node = line.verticalAtY(y);

      if (node.y === a.y) {
        continue;
      }

      nodes.push(node);
    }

    return nodes.filter((node) => isInBounds(boardSize, node));
  }

  let nodes = [];
  for (let x = a.x; x < boardSize.x && x >= 0; x += deltaX) {
    const node = line.atX(x);

    if (node.x === a.x) {
      continue;
    }

    nodes.push(node);
  }

  for (let x = a.x; x >= 0 && x < boardSize.x; x -= deltaX) {
    const node = line.atX(x);

    if (node.x === a.x) {
      continue;
    }

    nodes.push(node);
  }

  return nodes.filter((node) => isInBounds(boardSize, node));
}

module.exports = solve;

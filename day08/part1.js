const findAntinodes = require("./findAntinodes");
const parseInput = require("./parseInput");

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
        const nodes = findAntinodes(a, b, boardSize);
        nodes.forEach((n) => loc.add(`${n.x},${n.y}`));
        return accB;
      }, accA);
    }, loc);
  }, new Set());

  return locations.size;
}

module.exports = solve;


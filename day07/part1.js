const { hasSolution } = require("./hasSolution");
const { parseInput } = require("./parseInput");

function add(a, b) {
  return a + b;
}

function mult(a, b) {
  return a * b;
}

const OPERATORS = [add, mult];

function solve(input) {
  const parsed = parseInput(input);
  let result = 0;

  for (let line of parsed) {
    if (hasSolution(line, OPERATORS)) {
      result += line.value;
    }
  }

  return result;
}

module.exports = solve;


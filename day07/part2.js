const { hasSolution } = require("./hasSolution");
const { parseInput } = require("./parseInput");

function add(a, b) {
  return a + b;
}

function mult(a, b) {
  return a * b;
}

function concat(a, b) {
  return parseInt(a.toString() + b.toString(), 10);
}

const OPERATORS = [add, mult, concat];

function solve(input) {
  const parsed = parseInput(input, OPERATORS);
  let result = 0;

  for (let line of parsed) {
    if (hasSolution(line, OPERATORS)) {
      result += line.value;
    }
  }

  return result;
}

module.exports = solve;


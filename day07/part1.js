const operatorSequencer = require("./operatorSequencer");

function parseInput(input) {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      const [valueStr, numbersStr] = line.split(":");
      return {
        value: parseInt(valueStr, 10),
        numbers: numbersStr
          .trim()
          .split(" ")
          .map((num) => parseInt(num, 10)),
      };
    });
}

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
    if (hasSolution(line)) {
      result += line.value;
    }
  }

  return result;
}

function hasSolution(line) {
  const sequencer = operatorSequencer(OPERATORS, line.numbers);

  let hasSolution = false;
  for (let operators of sequencer) {
    let acc = line.numbers[0];

    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      const nextNum = line.numbers[i + 1];
      acc = operator(acc, nextNum);

      if (acc > line.value) {
        break;
      }
    }

    if (acc === line.value) {
      hasSolution = true;
    }
  }

  return hasSolution;
}

module.exports = solve;


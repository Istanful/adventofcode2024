const { parseInput } = require("./parseInput");
const { isValidUpdate } = require("./isValidUpdate");

const example = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

const exampleAnswer = solve(example);
console.assert(exampleAnswer === 123, `Expected 123. Got ${exampleAnswer}`);

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function solve(input) {
  const { rules, updates } = parseInput(input);

  let sum = 0;

  for (let update of updates) {
    if (isValidUpdate(update, rules)) {
      continue;
    }

    let validUpdate = clone(update);

    while (!isValidUpdate(validUpdate, rules)) {
      for (let rule of rules) {
        const [first, second] = rule;

        if (
          update.indices[first] === undefined ||
          update.indices[second] === undefined
        ) {
          continue;
        }

        const firstIndex = update.indices[first];
        const secondIndex = update.indices[second];

        if (firstIndex < secondIndex) {
          continue;
        }

        validUpdate.indices[first] = validUpdate.indices[first] - 1;
        validUpdate.indices[second] = validUpdate.indices[second] + 1;
      }
    }
    const numbers = Object.entries(validUpdate.indices)
      .sort((a, b) => {
        return a[1] - b[1];
      })
      .map(([key]) => parseInt(key, 10));
    const midNumber = numbers[Math.floor(numbers.length / 2)];
    sum += midNumber;
  }

  return sum;
}

module.exports = solve;


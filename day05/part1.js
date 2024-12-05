const { isValidUpdate } = require("./isValidUpdate");
const { parseInput } = require("./parseInput");

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

console.assert(
  solve(example) === 143,
  `Expected 143 but got ${solve(example)}`
);

function solve(input) {
  const { rules, updates } = parseInput(input);

  let sum = 0;

  for (let update of updates) {
    if (!isValidUpdate(update, rules)) {
      continue;
    }

    const midNumber = update.numbers[Math.floor(update.numbers.length / 2)];
    sum += midNumber;
  }

  return sum;
}

module.exports = solve;


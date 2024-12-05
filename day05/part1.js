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
  const [rulesStr, updatesStr] = input.trim().split("\n\n");
  const rules = rulesStr.split("\n").map((rule) => {
    return rule.split("|").map((num) => parseInt(num, 10));
  });

  const updates = updatesStr.split("\n").map((update) => {
    const numbers = update.split(",").map((num) => parseInt(num, 10));
    const indices = numbers.reduce((acc, num, i) => {
      return { ...acc, [num]: i };
    }, {});
    return { numbers, indices };
  });

  let sum = 0;

  for (let update of updates) {
    let isValid = true;

    for (let rule of rules) {
      const [first, second] = rule;

      isValid =
        isValid === true &&
        (update.indices[first] === undefined ||
          update.indices[second] === undefined ||
          update.indices[first] < update.indices[second]);
    }

    if (!isValid) {
      continue;
    }

    const midNumber = update.numbers[Math.floor(update.numbers.length / 2)];
    sum += midNumber;
  }

  return sum;
}

module.exports = solve;


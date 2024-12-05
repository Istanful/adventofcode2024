function parseInput(input) {
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

  return { rules, updates };
}
exports.parseInput = parseInput;

const example = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

console.assert(solve(example) === 48, "Expected 48");

function solve(input) {
  const operations = [...input.matchAll(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/g)];
  let enabled = true;
  let sum = 0;

  for (let operation of operations) {
    const [op] = operation;

    switch (op) {
      case "do()": {
        enabled = true;
        continue;
      }
      case "don't()":
        enabled = false;
        continue;
      default: {
        if (!enabled) {
          continue;
        }

        const [a, b] = operation[0]
          .match(/\d+/g)
          .map((num) => parseInt(num, 10));
        sum += a * b;
      }
    }
  }

  return sum;
}

module.exports = solve;

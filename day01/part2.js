const example = `
3   4
4   3
2   5
1   3
3   9
3   3
`;

console.assert(solve(example) === 31, solve(example));

function solve(input) {
  const rawLines = input.trim().split("\n");
  let leftArr = [];
  const rightStats = new Map();

  for (let line of rawLines) {
    const [left, right] = line.split(/\s+/).map((num) => {
      return parseInt(num, 10);
    });

    leftArr.push(left);

    const currentCount = rightStats.get(right) ?? 0;
    rightStats.set(right, currentCount + 1);
  }

  let score = 0;
  for (let left of leftArr) {
    score += left * (rightStats.get(left) ?? 0);
  }

  return score;
}

module.exports = solve;

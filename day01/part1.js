const example = `
3   4
4   3
2   5
1   3
3   9
3   3
`;

console.assert(solve(example) === 11, `Expected 11 but got ${solve(example)}`);

function solve(input) {
  const rawLines = input.trim().split("\n");
  const leftArr = [];
  const rightArr = [];

  for (let line of rawLines) {
    const [left, right] = line.split(/\s+/).map((num) => {
      return parseInt(num, 10);
    });

    leftArr.push(left);
    rightArr.push(right);
  }

  leftArr.sort();
  rightArr.sort();

  let sum = 0;
  for (let i = 0; i < leftArr.length; i++) {
    const left = leftArr[i];
    const right = rightArr[i];
    const diff = Math.abs(left - right);
    sum += diff;
  }

  return sum;
}

module.exports = solve;

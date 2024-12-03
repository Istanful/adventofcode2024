const example = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

console.assert(
  solve(example) === 161,
  `Expected 161 but got ${solve(example)}`
);

function solve(input) {
  const multiplications = [...input.matchAll(/mul\(\d+,\d+\)/g)];
  return multiplications.reduce((acc, mult) => {
    const [a, b] = mult[0].match(/\d+/g).map((num) => parseInt(num, 10));
    return acc + a * b;
  }, 0);
}

module.exports = solve;

const getUnsafeIndex = require("./getUnsafeIndex");
const parseReports = require("./parseReports");

const example = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

console.assert(solve(example) === 4, `Expected 4 but got ${solve(example)}`);
console.assert(solve(`1 9 45`) === 0, `Expected 0 but got ${solve(`1 9 45`)}`);
console.assert(
  solve(`1 9 0 1`) === 0,
  `Expected 0 but got ${solve(`1 9 0 1`)}`
);
console.assert(solve(`1 9`) === 1, `Expected 1 but got ${solve(`1 9`)}`);
console.assert(solve(`1 9 8`) === 1, `Expected 1 but got ${solve(`1 9 8 `)}`);
console.assert(solve(`1 9 2`) === 1, `Expected 1 but got ${solve(`1 9 2`)}`);
console.assert(solve(`1 2 9`) === 1);
console.assert(solve(`1 2 9 2`) === 0);
console.assert(solve(`40 42 45 46 49 47`) === 1);
console.assert(solve(`80 79 82 80 83`) === 0);
console.assert(solve(`81 77 75 73 71 65`) === 0);
console.assert(solve(`90 86 85 86 85 84 82 84`) === 0);
console.assert(solve(`34 32 30 28 25 23`) === 1);
console.assert(solve(`1 2 3`) === 1);
console.assert(solve(`1 4 9`) === 1);
console.assert(solve(`1 9 8`) === 1);
console.assert(solve(`9 8 1`) === 1);
console.assert(solve(`9 8 8`) === 1);
console.assert(solve(`10 9 11 12`) === 1);
console.assert(solve(`5 3 2 2`) === 1);
console.assert(solve(`2 2`) === 1);
console.assert(solve(`2`) === 1);
console.assert(solve(`2 3`) === 1);
console.assert(solve(`2 3 2`) === 1);
console.assert(solve(`2 3 2 2`) === 0);
console.assert(solve(`1 3 3 4`) === 1);
console.assert(solve(`1 3 3 8`) === 0);
console.assert(solve(`1 3 4 8`) === 1);
console.assert(solve(`8 1`) === 1);
console.assert(solve(`1 3 2 1`) === 1);

function solve(input) {
  const reports = parseReports(input);
  const safeReports = reports.filter((report) => {
    const unsafeIndex = getUnsafeIndex(report);

    if (unsafeIndex === null) {
      return true;
    }

    for (let i = 0; i < report.length; i++) {
      const dampenedReport = [...report.slice(0, i), ...report.slice(i + 1)];
      const unsafeIndex = getUnsafeIndex(dampenedReport);
      if (unsafeIndex === null) {
        return true;
      }
    }

    return false;
  });

  return safeReports.length;
}

module.exports = solve;

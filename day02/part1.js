const parseReports = require("./parseReports");
const getUnsafeIndex = require("./getUnsafeIndex");

const example = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

console.assert(solve(example) === 2, `Expected 2 but got ${solve(example)}`);

function solve(input) {
  const reports = parseReports(input);

  return reports.filter((report) => {
    const index = getUnsafeIndex(report);
    return index === null;
  }).length;
}

module.exports = solve;

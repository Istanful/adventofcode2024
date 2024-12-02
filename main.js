const days = require("./daysConfig");
const Runner = require("./Runner");
const fs = require("node:fs");

let output = "";
output += "# Advent Of Code 2024\n";
output += "\n";
output += "## Completed\n";
output += "\n";
output += `| Day | Part 1 | Part 2 |\n`;
output += `| --- | ------ | ------ |\n`;

days.forEach((day) => {
  console.log(`Solving ${day.name}...`);
  let daySolver = null;

  try {
    daySolver = require(`./${day.name}/index.js`);
  } catch (e) {
    daySolver = new Runner.Node();
  }

  const solutions = daySolver.solve(day);
  output += `| ${day.name} `;

  if (solutions.part1.answer === day.part1.answer) {
    output += `| ★ `;
  } else {
    console.log(`Got ${day.name} part 1 answer: ${solutions.part1.answer}`);
    output += `| ☆ `;
  }

  if (solutions.part2.answer === day.part2.answer) {
    output += `| ★  |`;
  } else {
    console.log(`Got ${day.name} part 2 answer: ${solutions.part2.answer}`);
    output += `| ☆  |\n`;
  }
});

fs.writeFileSync(`./README.md`, output, "utf8");

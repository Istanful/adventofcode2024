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

days.forEach(async (day, i) => {
  const dayNumber = i + 1;
  const dayName = `day${dayNumber.toString().padStart(2, "0")}`;
  console.log(`Solving ${dayName}...`);
  let runner = null;

  try {
    runner = require(`./${dayName}/index.js`);
  } catch (e) {
    runner = new Runner.Node();
  }

  const solutions = await runner.solve({
    ...day,
    name: dayName,
    number: dayNumber,
  });
  output += `| ${dayNumber} `;

  if (solutions.part1.answer === day.part1.answer) {
    output += `| ★ `;
  } else {
    console.log(`Got ${dayNumber} part 1 answer: ${solutions.part1.answer}`);
    output += `| ☆ `;
  }

  if (solutions.part2.answer === day.part2.answer) {
    output += `| ★  |\n`;
  } else {
    console.log(`Got ${dayNumber} part 2 answer: ${solutions.part2.answer}`);
    output += `| ☆  |\n`;
  }
});

fs.writeFileSync(`./README.md`, output, "utf8");

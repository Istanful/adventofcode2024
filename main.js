const days = require("./daysConfig");
const Runner = require("./Runner");
const fs = require("node:fs");

const sessionCookie = fs.readFileSync("./sessionCookie.txt", "utf8").trim();

async function run() {
  let output = "";
  output += "# Advent Of Code 2024\n";
  output += "\n";
  output += "## Completed\n";
  output += "\n";

  const statRows = [];

  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const dayNumber = i + 1;
    const dayName = `day${dayNumber.toString().padStart(2, "0")}`;
    console.log(`Solving ${dayName}...`);
    const input = await getInput({ name: dayName, dayNumber });
    const dayConfig = {
      ...day,
      name: dayName,
      number: dayNumber,
      input,
    };

    let runner = null;
    try {
      runner = require(`./${dayName}/index.js`);
    } catch (e) {
      runner = new Runner.Node();
    }

    const templates = runner.getTemplates(dayConfig);
    for (let template of templates) {
      if (!fs.existsSync(template.path)) {
        fs.writeFileSync(template.path, template.content, "utf8");
      }
    }

    const solutions = await runner.solve(dayConfig);
    const hasCorrectPart1 = solutions.part1.answer === day.part1.answer;
    const hasCorrectPart2 = solutions.part2.answer === day.part2.answer;

    if (!hasCorrectPart1) {
      console.log(`Got ${dayName} part 1 answer: ${solutions.part1.answer}`);
    }

    if (!hasCorrectPart2) {
      console.log(`Got ${dayName} part 2 answer: ${solutions.part2.answer}`);
    }

    statRows.push([
      dayName,
      hasCorrectPart1 ? "★ " : "☆ ",
      `${solutions.part1.elapsed}ms`,
      hasCorrectPart2 ? "★ " : "☆ ",
      `${solutions.part2.elapsed}ms`,
    ]);
  }

  output += table([
    ["Day", "Part 1", "Part 1 took", "Part 2", "Part 2 took"],
    ...statRows,
  ]);

  fs.writeFileSync(`./README.md`, output, "utf8");
}

async function getInput({ name, dayNumber }) {
  const inputPath = `${__dirname}/${name}/input.txt`;

  if (!fs.existsSync(inputPath)) {
    console.log(`Fetching puzzle input for ${name}...`);
    const url = `https://adventofcode.com/2024/day/${dayNumber}/input`;
    const newInput = await fetch(url, {
      headers: {
        cookie: sessionCookie,
      },
    }).then((response) => response.text());
    fs.mkdirSync(`${__dirname}/${name}`);
    fs.writeFileSync(inputPath, newInput, "utf8");
    return newInput;
  }

  return fs.readFileSync(inputPath, "utf8");
}

function table(data) {
  const [headingRow] = data;
  let output = "";
  let columnWidths = headingRow.map(() => 0);

  for (let row of data) {
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell.length > columnWidths[x]) {
        columnWidths[x] = cell.length;
      }
    }
  }

  for (let y = 0; y < data.length; y++) {
    const isHeading = y === 0;
    const cells = data[y];

    for (let x = 0; x < cells.length; x++) {
      const cell = cells[x];
      const columnWidth = columnWidths[x];
      output += `| ${cell.padEnd(columnWidth, " ")} `;
    }
    output += "|\n";

    if (isHeading) {
      output += `|${columnWidths
        .map((width) => ` ${"-".repeat(width)} `)
        .join("|")}|\n`;
    }
  }

  return output;
}

run();

const fs = require("node:fs");

const sessionCookie = fs.readFileSync("./sessionCookie.txt", "utf8").trim();

class NodeRunner {
  async solve(dayConfig) {
    const { name, number } = dayConfig;

    const input = await this.getInput(name, number);
    const part1Answer = this.run(`${__dirname}/${name}/part1.js`, input);
    const part2Answer = this.run(`${__dirname}/${name}/part2.js`, input);

    return {
      part1: {
        answer: part1Answer,
      },
      part2: {
        answer: part2Answer,
      },
    };
  }

  run(path, input) {
    if (!fs.existsSync(path)) {
      const template = [
        "function solve(input) {",
        "}",
        "module.exports = solve",
      ];
      fs.writeFileSync(path, template);
    }

    try {
      const func = require(path);
      return func(input);
    } catch (e) {
      return undefined;
    }
  }

  async getInput(name, dayNumber) {
    const inputPath = `${__dirname}/${name}/input.txt`;

    if (!fs.existsSync(inputPath)) {
      const url = `https://adventofcode.com/2024/day/${dayNumber}/input`;
      const newInput = await fetch(url, {
        headers: {
          cookie: sessionCookie,
        },
      }).then((response) => response.text());
      fs.writeFileSync(inputPath, newInput, "utf8");
      return newInput;
    }

    return fs.readFileSync(inputPath, "utf8");
  }
}

module.exports = {
  Node: NodeRunner,
};

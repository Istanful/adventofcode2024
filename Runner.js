const fs = require("node:fs");

const sessionCookie = fs.readFileSync("./sessionCookie.txt", "utf8").trim();

class NodeRunner {
  async solve(dayConfig) {
    const { input } = dayConfig;

    const part1Answer = this.run(this.solutionPath(dayConfig, 1), input);
    const part2Answer = this.run(this.solutionPath(dayConfig, 2), input);

    return {
      part1: {
        answer: part1Answer,
      },
      part2: {
        answer: part2Answer,
      },
    };
  }

  getTemplates(dayConfig) {
    const content = [
      "function solve(input) {",
      "}",
      "module.exports = solve",
    ].join("\n");

    return [
      {
        path: this.solutionPath(dayConfig, 1),
        content,
      },
      {
        path: this.solutionPath(dayConfig, 2),
        content,
      },
    ];
  }

  solutionPath({ name }, partNo) {
    return `${__dirname}/${name}/part${partNo}.js`;
  }

  run(path, input) {
    try {
      const func = require(path);
      return func(input);
    } catch (e) {
      return undefined;
    }
  }
}

module.exports = {
  Node: NodeRunner,
};

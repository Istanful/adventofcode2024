const { execSync } = require("node:child_process");
const fs = require("node:fs");

const sessionCookie = fs.readFileSync("./sessionCookie.txt", "utf8").trim();

class RubyRunner {
  async solve(dayConfig) {
    const { input } = dayConfig;

    const part1Answer = execSync(
      `ruby ${this.getSolutionPath(dayConfig, 1)} "${input}"`
    ).toString("utf8");
    const part2Answer = execSync(
      `ruby ${this.getSolutionPath(dayConfig, 2)}`
    ).toString("utf8");
    console.log(part1Answer);

    return {
      part1: { answer: part1Answer },
      part2: { answer: part2Answer },
    };
  }

  getSolutionPath(dayConfig, part) {
    return `${__dirname}/${dayConfig.name}/part_${part}.rb`;
  }

  getTemplates(dayConfig) {
    const getcontent = (part) => {
      const modName = `Day${dayConfig.number}Part${part}`;
      return [
        `module ${modName}`,
        `  def self.solve(input)`,
        `  end`,
        `end`,
        ``,
        `puts ${modName}.solve(ARGV[0])`,
      ].join("\n");
    };
    return [
      {
        path: this.getSolutionPath(dayConfig, 1),
        content: getcontent(1),
      },
      {
        path: this.getSolutionPath(dayConfig, 2),
        content: getcontent(2),
      },
    ];
  }
}

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
  Ruby: RubyRunner,
};

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

function bm(func) {
  const startsAt = new Date();
  const result = func();
  const endsAt = new Date();
  return {
    result,
    elapsed: endsAt.getTime() - startsAt.getTime(),
  };
}

class NodeRunner {
  async solve(dayConfig) {
    const { input } = dayConfig;

    const part1 = this.run(this.solutionPath(dayConfig, 1), input);
    const part2 = this.run(this.solutionPath(dayConfig, 2), input);

    return {
      part1: {
        answer: part1.result,
        elapsed: part1.elapsed,
      },
      part2: {
        answer: part2.result,
        elapsed: part2.elapsed,
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
      return bm(() => func(input));
    } catch (e) {
      console.log(`${path} threw err: ${e}`);
      return undefined;
    }
  }
}

module.exports = {
  Node: NodeRunner,
  Ruby: RubyRunner,
};

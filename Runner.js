class NodeRunner {
  solve(dayConfig) {
    const { name, part1, part2 } = dayConfig;
    const part1Answer = this.run(`${__dirname}/${name}/part1.js`, part1.input);
    const part2Answer = this.run(`${__dirname}/${name}/part2.js`, part2.input);

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

const fs = require("node:fs");

module.exports = [
  {
    name: "day01",
    part1: {
      answer: 1223326,
      input: fs.readFileSync("./inputs/day01part1.txt", "utf8"),
    },
    part2: {
      answer: 21070419,
      input: fs.readFileSync("./inputs/day01part1.txt", "utf8"),
    },
  },
  {
    name: "day02",
    part1: {
      answer: 680,
      input: fs.readFileSync("./inputs/day02part1.txt", "utf8"),
    },
    part2: {
      answer: 710,
      input: fs.readFileSync("./inputs/day02part1.txt", "utf8"),
    },
  },
];

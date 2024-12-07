function parseInput(input) {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      const [valueStr, numbersStr] = line.split(":");
      return {
        value: parseInt(valueStr, 10),
        numbers: numbersStr
          .trim()
          .split(" ")
          .map((num) => parseInt(num, 10)),
      };
    });
}
exports.parseInput = parseInput;

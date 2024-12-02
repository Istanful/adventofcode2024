module.exports = function parseReports(input) {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      return line.split(/\s+/).map((num) => {
        return parseInt(num, 10);
      });
    });
};

const solve = require("./part2");

describe(solve, () => {
  it("solves the example", () => {
    const example = [
      "............",
      "........0...",
      ".....0......",
      ".......0....",
      "....0.......",
      "......A.....",
      "............",
      "............",
      "........A...",
      ".........A..",
      "............",
      "............",
    ].join("\n");

    expect(solve(example)).toEqual(34);
  });
});

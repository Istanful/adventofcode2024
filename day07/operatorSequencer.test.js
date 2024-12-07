const operatorSequencer = require("./operatorSequencer");

describe(operatorSequencer, () => {
  it("generates possible sequences for array with 2 length", () => {
    const operators = ["+", "-"];
    const numbers = [1, 2];
    const sequencer = operatorSequencer(operators, numbers);

    expect(sequencer.next().value).toEqual(["+"]);
    expect(sequencer.next().value).toEqual(["-"]);
  });

  it("generates possible sequences for array with 4 length", () => {
    const operators = ["+", "-"];
    const numbers = [1, 2, 3, 4];
    const sequencer = operatorSequencer(operators, numbers);
    let result = [];
    for (let permutation of sequencer) {
      result.push(permutation.join(""));
    }

    expect(result.length).toEqual(8);
    expect(result.sort().join("\n")).toEqual(
      ["+++", "++-", "+-+", "+--", "-++", "-+-", "--+", "---"].join("\n")
    );
  });
});

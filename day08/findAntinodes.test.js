const findAntinodes = require("./findAntinodes");

describe(findAntinodes, () => {
  it("finds antinodes", () => {
    const boardSize = { x: 10, y: 10 };

    expect(findAntinodes({ x: 2, y: 2 }, { x: 3, y: 3 }, boardSize)).toEqual([
      { x: 1, y: 1 },
      { x: 4, y: 4 },
    ]);

    expect(findAntinodes({ x: 3, y: 3 }, { x: 4, y: 4 }, boardSize)).toEqual([
      { x: 2, y: 2 },
      { x: 5, y: 5 },
    ]);

    // Order should not matter
    expect(findAntinodes({ x: 5, y: 5 }, { x: 3, y: 3 }, boardSize)).toEqual([
      { x: 7, y: 7 },
      { x: 1, y: 1 },
    ]);

    // Filter out out of bounds antinodes
    expect(findAntinodes({ x: 0, y: 0 }, { x: 1, y: 1 }, boardSize)).toEqual([
      { x: 2, y: 2 },
    ]);
    expect(findAntinodes({ x: 1, y: 1 }, { x: 0, y: 0 }, boardSize)).toEqual([
      { x: 2, y: 2 },
    ]);
    expect(
      findAntinodes({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 })
    ).toEqual([]);
    expect(
      findAntinodes({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 })
    ).toEqual([]);

    // Vertical should work despite infinite slope
    expect(findAntinodes({ x: 2, y: 2 }, { x: 2, y: 3 }, boardSize)).toEqual([
      { x: 2, y: 1 },
      { x: 2, y: 4 },
    ]);

    // Order should not matter
    expect(findAntinodes({ x: 2, y: 3 }, { x: 2, y: 2 }, boardSize)).toEqual([
      { x: 2, y: 4 },
      { x: 2, y: 1 },
    ]);

    // Should not find antinodes for identical antenna
    expect(findAntinodes({ x: 1, y: 1 }, { x: 1, y: 1 }, boardSize)).toEqual(
      []
    );

    // Horizontal
    expect(findAntinodes({ x: 0, y: 0 }, { x: 1, y: 0 }, boardSize)).toEqual([
      { x: 2, y: 0 },
    ]);
    expect(findAntinodes({ x: 1, y: 0 }, { x: 0, y: 0 }, boardSize)).toEqual([
      { x: 2, y: 0 },
    ]);

    // Should round coordinates
    expect(
      findAntinodes(
        { x: 26, y: 36 },
        { x: 19, y: 40 },
        {
          x: 50,
          y: 50,
        }
      )
    ).toEqual([
      { x: 33, y: 32 },
      { x: 12, y: 44 },
    ]);
  });
});

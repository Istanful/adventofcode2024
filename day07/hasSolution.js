const operatorSequencer = require("./operatorSequencer");

function hasSolution(line, operators) {
  const sequencer = operatorSequencer(operators, line.numbers);

  let hasSolution = false;
  for (let operators of sequencer) {
    let acc = line.numbers[0];

    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      const nextNum = line.numbers[i + 1];
      acc = operator(acc, nextNum);

      if (acc > line.value) {
        break;
      }
    }

    if (acc === line.value) {
      hasSolution = true;
    }
  }

  return hasSolution;
}
exports.hasSolution = hasSolution;

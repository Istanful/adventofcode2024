function* operatorSequencer(operators, numbers) {
  let gapCount = numbers.length - 1;

  let acc = operators;

  for (let i = 0; i < gapCount - 1; i++) {
    let newAcc = [];

    /**
     * If we could generate each new pair deterministically we could yield it
     * here and do some work skipping.
     **/
    for (let permutation of cartesianProduct(operators, acc)) {
      newAcc.push(permutation);
    }

    acc = newAcc;
  }

  for (let permutation of acc) {
    yield wrap(permutation);
  }
}

function wrap(arrayOrItem) {
  return Array.isArray(arrayOrItem) ? arrayOrItem : [arrayOrItem];
}

function* cartesianProduct(a, b) {
  for (let x of a) {
    for (let y of b) {
      const pair = [...wrap(x), ...wrap(y)];
      yield pair;
    }
  }
}

module.exports = operatorSequencer;

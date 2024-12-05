function isValidUpdate(update, rules) {
  let isValid = true;

  for (let rule of rules) {
    const [first, second] = rule;

    isValid =
      isValid === true &&
      (update.indices[first] === undefined ||
        update.indices[second] === undefined ||
        update.indices[first] < update.indices[second]);

    if (!isValid) {
      return false;
    }
  }

  return isValid;
}
exports.isValidUpdate = isValidUpdate;

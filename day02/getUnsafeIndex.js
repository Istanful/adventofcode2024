module.exports = function getUnsafeIndex(report) {
  let order = 0;

  for (let i = 0; i < report.length; i++) {
    switch (i) {
      case 0:
        continue;
      case 1: {
        const previous = report[i - 1];
        const current = report[i];
        const diff = current - previous;

        if (diff === 0) {
          return i;
        }

        const absDiff = Math.abs(diff);

        if (absDiff < 1 || absDiff > 3) {
          return i;
        }

        order = diff > 0 ? 1 : -1;

        continue;
      }
      default: {
        const current = report[i];
        const previous = report[i - 1];
        const diff = current - previous;

        if (diff === 0) {
          return i;
        }

        const absDiff = Math.abs(diff);

        if (absDiff < 1 || absDiff > 3) {
          return i;
        }

        const currentOrder = diff > 0 ? 1 : -1;

        if (currentOrder !== order) {
          return i;
        }
      }
    }
  }

  return null;
};

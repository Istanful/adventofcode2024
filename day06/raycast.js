function raycast(source, direction, targets) {
  let hits = [];
  let k = direction.y / direction.x;
  let isVertical = direction.x === 0;

  const m = source.y - k * source.x;

  for (let target of targets) {
    if (!isVertical) {
      const isHit = target.x * k + m === target.y;
      const hitDir = {
        x: Math.sign(target.x - source.x),
        y: Math.sign(target.y - source.y),
      };

      if (isHit && hitDir.x === direction.x && hitDir.y === direction.y) {
        hits.push(target);
      }

      continue;
    }

    if (direction.y > 0) {
      const isHit = target.x === source.x && target.y > source.y;

      if (isHit) {
        hits.push(target);
      }

      continue;
    }

    const isHit = target.x === source.x && target.y < source.y;
    if (isHit) {
      hits.push(target);
    }
  }

  const closest = hits.sort((a, b) => {
    const aDistance = Math.abs(a.x - source.x) + Math.abs(a.y - source.y);
    const bDistance = Math.abs(b.x - source.x) + Math.abs(b.y - source.y);
    return aDistance - bDistance;
  })[0];

  return closest;
}
exports.raycast = raycast;

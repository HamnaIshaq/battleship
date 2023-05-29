const Ship = (name, shipLength) => {
  let hitCount = 0;

  function size() {
    return shipLength;
  }

  function setMaxHitCount() {
    hitCount = size();
  }

  function isSink() {
    return hitCount === size();
  }

  function hit() {
    hitCount += 1;

    if (hitCount >= size()) {
      setMaxHitCount();
      return isSink();
    }

    return hitCount;
  }

  const ship = {
    name,
    size,
    hit,
  };

  return ship;
};
export default Ship;

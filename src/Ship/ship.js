const Ship = (length) => {
  let hitCount = 0;
  function len() {
    return length;
  }

  function hit() {
    // by default hit is 0, and hit is maximun eq to length of ship
    hitCount++;
    if (hitCount > len()) {
      return "Ship cannot be hit more than its length";
    }
    return hitCount;
  }

  function getCurrentHitCount() {
    return hitCount;
  }

  function isSink() {
    // get number of hits, get length of ship, compare the 2 if they are equal, ship has sunk, else not sunken
    const shipLength = len();
    const hitCounter = getCurrentHitCount();

    return hitCounter === shipLength ? true : false;
  }

  return {
    len,
    hit,
    isSink,
  };
};

export default Ship;

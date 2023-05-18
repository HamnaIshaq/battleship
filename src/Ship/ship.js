const Ship = (length, hitCount = 0) => {
  const len = () => {
    return length;
  };

  const hit = () => {
    // by default hit is 0, and hit is maximun eq to length of ship
    if (hitCount > len()) {
      return "Ship cannot be hit more than its length";
    }
    return hitCount;
  };

  const isSink = () => {
    // get number of hits, get length of ship, compare the 2 if they are equal, ship has sunk, else not sunken
    const shipLength = len();
    const hitCounter = hit();

    return hitCounter === shipLength ? true : false;
  };

  return {
    len,
    hit,
    isSink,
  };
};

export default Ship;

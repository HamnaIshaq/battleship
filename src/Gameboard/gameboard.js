const GameBoard = () => {
  const createGameBoard = () => {
    let board = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        board.push([i, j]);
      }
    }

    return board;
  };

  const gameBoard = createGameBoard();
  let shipPlacement = [];

  // place ship on gameboard
  const placeShip = (ship, start, end) => {
    const shipPlaced = gameBoard.filter((square) => {
      if (
        start.toString() === square.toString() ||
        end.toString() === square.toString()
      ) {
        return square;
      }
    });
    shipPlacement.push({
      ship: ship,
      coords: shipPlaced,
    });
    return shipPlaced;
  };

  // receive attack on gameboard
  const receiveAttack = (coords) => {
    let attackedSquare;
    for (let i = 0; i < shipPlacement.length; i++) {
      const shipCoords = shipPlacement[i].coords;
      for (let j = 0; j < shipCoords.length; j++) {
        if (shipCoords.toString() !== coords.toString()) {
          attackedSquare = "missed";
        }
      }
    }
    return attackedSquare;
  };

  return {
    placeShip,
    receiveAttack,
  };
};

export default GameBoard;

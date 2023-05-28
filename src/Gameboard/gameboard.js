const GameBoard = () => {
  const gameBoard = createGameBoard();
  let shipPlacement = [];
  let recordShots = [];
  let shipCoordsArr = [];

  function createGameBoard() {
    let board = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        board.push([i, j]);
      }
    }

    return board;
  }

  // place ship on gameboard
  function placeShip(ship, start, end) {
    const shipOverLap = checkForShipOverlap(start, end);

    if (shipOverLap) {
      return "ERROR: cannot place ship on top of another ship!";
    }

    const shipPlaced = gameBoard.filter((square) => {
      if (
        start.toString() === square.toString() ||
        end.toString() === square.toString()
      ) {
        return square;
      }
    });
    const [startCell, endCell] = shipPlaced;

    const shipLocation = shipPlacementOnBoard(startCell, endCell);

    shipCoordsArr.push(shipLocation);

    shipPlacement.push({
      ship: ship,
      coords: shipLocation,
    });
    return shipPlaced;
  }
  // all ship cells from start position to end position
  function shipPlacementOnBoard(startCell, endCell) {
    const [startX, startY] = startCell;
    const [endX, endY] = endCell;

    let shipCellsArr = [];

    if (startY !== endY) {
      for (let y = startY; y <= endY; y++) {
        shipCellsArr.push([startX, y]);
      }
      return shipCellsArr;
    }
    for (let x = startX; x <= endX; x++) {
      shipCellsArr.push([x, startY]);
    }

    return shipCellsArr;
  }

  function shipCoords() {
    return shipCoordsArr.flat();
  }

  function checkForShipOverlap(start, end) {
    if (shipCoords()) {
      const shipCells = shipCoords();
      const shipOverLap = shipCells.some((cell) => {
        if (
          (cell[0] === start[0] && cell[1] === start[1]) ||
          (cell[0] === end[0] && cell[1] === end[1])
        ) {
          return true;
        }
      });
      return shipOverLap;
    }
  }

  // receive attack on gameboard
  function receiveAttack(attackCell) {
    let attackOnAlreadyHitCoord = checkForAttackOnSameCoordinate(attackCell);

    if (attackOnAlreadyHitCoord) {
      return "cannot attach twice on the same coordinate";
    }

    let attackedSquare;

    shipPlacement.forEach((shipData) => {
      shipData.coords.forEach((coords) => {
        if (coords[0] === attackCell[0] && coords[1] === attackCell[1]) {
          recordShots.push(attackCell);
          shipData.ship.hit();
          attackedSquare = "ship was hit!";
          if (shipData.ship.isSink()) {
            attackedSquare = "ship has sunk!";
          }
        }
      });
    });
    if (!attackedSquare) {
      attackedSquare = "missed";
      recordShots.push(attackCell);
    }

    return attackedSquare;
  }

  function checkForAttackOnSameCoordinate(attackCell) {
    const coordinate = recordShots.some(
      (coordinate) =>
        coordinate[0] === attackCell[0] && coordinate[1] === attackCell[1]
    );
    return coordinate;
  }

  function allShipsHaveSunk() {
    const totalShips = getTotalShipsOnBoard();
    let totalSunkShips = 0;
    shipPlacement.forEach((data) => {
      if (data.ship.isSink()) {
        totalSunkShips++;
      }
    });
    if (totalSunkShips === totalShips) {
      return "all ships have sunk";
    }
  }

  function getTotalShipsOnBoard() {
    return shipPlacement.length;
  }

  return {
    placeShip,
    receiveAttack,
    allShipsHaveSunk,
    recordShots,
    gameBoard,
    shipCoords,
  };
};

export default GameBoard;

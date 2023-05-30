const Gameboard = () => {
  const shipsOnBoard = [];
  const recordShotsOnBoard = [];
  const missedShots = [];
  const shipCellsOccupied = [];
  let sinkShips = 0;

  function grid() {
    let x = 0;
    const board = [];
    // eslint-disable-next-line no-plusplus
    for (let y = 0; x < 10; y++) {
      if (y === 10) {
        y = -1;
        x += 1;
      } else {
        board.push([x, y]);
      }
    }
    return board;
  }

  function checkForValidCellInGrid(cell) {
    const board = grid();
    let valid = false;
    board.forEach((boardCell) => {
      if (boardCell[0] === cell[0] && boardCell[1] === cell[1]) {
        valid = true;
      }
    });
    return valid;
  }

  function checkForShipOverlap(cell) {
    let shipOverlap;
    shipsOnBoard.forEach((ship) => {
      shipOverlap = ship.shipCellsArr.some((shipCell) => {
        if (shipCell[0] === cell[0] && shipCell[1] === cell[1]) {
          return true;
        }
      });
    });
    return shipOverlap;
  }

  function getShipCellsOnBoard(shipSize, startCell, direction) {
    const shipCells = [];
    let validCell = true;

    shipCells.push(startCell);

    // checkForShipOverlap(startCell);
    if (direction === "horizontal") {
      let endY = startCell[1];
      for (let y = 0; y < shipSize - 1; y++) {
        endY += 1;
        const cell = [startCell[0], endY];
        shipCells.push(cell);
        validCell = checkForValidCellInGrid(cell);

        if (!validCell) {
          break;
        }
      }
    } else if (direction === "vertical") {
      let endX = startCell[0];
      for (let x = 0; x < shipSize - 1; x++) {
        endX += 1;
        const cell = [endX, startCell[1]];
        shipCells.push(cell);
        shipCellsOccupied.push(cell);
        validCell = checkForValidCellInGrid(cell);

        if (!validCell) {
          break;
        }
      }
    }
    return !validCell
      ? `[${shipCells[shipCells.length - 1]}] is not a valid move`
      : shipCells;
  }

  function placeShip(ship, startingPosition, directionOnBoard) {
    const shipCellsArr = getShipCellsOnBoard(
      ship.size(),
      startingPosition,
      directionOnBoard
    );

    // before placing it on board, check if any of the coordinates overlap with any of the previous ships placed of the board

    if (shipCellsOccupied.length !== 0) {
      let inValidCell;

      for (let i = 0; i < shipCellsArr.length; i++) {
        const valid = checkForShipOverlap(shipCellsArr[i]);
        if (valid === true) {
          inValidCell = shipCellsArr[i];
          break;
        }
      }
      if (inValidCell) {
        return `[${inValidCell}] is already occupied by another ship! invalid placement of ship`;
      }
    }

    shipCellsOccupied.push(shipCellsArr);

    const shipOnBoard = {
      ship,
      shipCellsArr,
    };

    shipsOnBoard.push(shipOnBoard);
    return shipCellsArr;
  }

  function checkCellAttackedTwice(cell) {
    const duplicateAttack = recordShotsOnBoard.some(
      (recordedCell) =>
        recordedCell[0] === cell[0] && recordedCell[1] === cell[1]
    );

    return duplicateAttack;
  }

  function receiveAttack(cell) {
    // check if cell is attacked twice
    if (checkCellAttackedTwice(cell)) {
      return `cannot hit twice on [${cell}]`;
    }

    let attackResult = "miss";
    shipsOnBoard.map((ships) => {
      ships.shipCellsArr.map((shipCell) => {
        if (shipCell[0] === cell[0] && shipCell[1] === cell[1]) {
          ships.ship.hit();
          attackResult = "hit";
          recordShotsOnBoard.push(cell);
          if (ships.ship.isSink()) {
            attackResult = `${ships.ship.name} has sunk!`;
            sinkShips++;
          }
        }
      });
    });

    if (attackResult === "miss") {
      recordShotsOnBoard.push(cell);
      missedShots.push(cell);
    }
    return attackResult;
  }

  function allShipsSunk() {
    return sinkShips === shipsOnBoard.length;
  }

  return {
    grid,
    placeShip,
    receiveAttack,
    allShipsSunk,
  };
};

export default Gameboard;

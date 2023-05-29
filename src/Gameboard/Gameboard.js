const Gameboard = () => {
  const shipsOnBoard = [];

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

  function getShipCellsOnBoard(shipSize, startCell, direction) {
    const shipCells = [];
    let validCell = true;
    shipCells.push(startCell);
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

    const shipOnBoard = {
      ship,
      shipCellsArr,
    };

    shipsOnBoard.push(shipOnBoard);
    return shipCellsArr;
  }

  return {
    grid,
    placeShip,
  };
};

export default Gameboard;

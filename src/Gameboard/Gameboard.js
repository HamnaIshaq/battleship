import Ship from "../Ship/Ship";

const Gameboard = () => {
  const shipsOnBoard = []; // ships with coord position on board
  const recordShotsOnBoard = []; // enemy hits on board
  const missedShots = []; // enemy shots missed on board
  const shipCellsOccupied = []; // ship cells coods arr
  let sinkShips = 0; // total number of ships that have sunk
  const board = [];

  // board
  function grid() {
    let x = 0;
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

  // check if a coordinate is present in board
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

  // check if a coordinate is overlapping with a ship coordinate
  function checkForShipOverlap(cell) {
    let shipOverlap;

    shipCellsOccupied.forEach((singleShipCells) => {
      singleShipCells.forEach((shipCell) => {
        if (shipCell[0] === cell[0] && shipCell[1] === cell[1]) {
          shipOverlap = true;
        }
      });
    });
    return shipOverlap;
  }
  // get ship cells from starting position until their length is reached
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

    // return shipCells;

    return !validCell
      ? `[${shipCells[shipCells.length - 1]}] is not a valid cell`
      : shipCells;
  }

  // place ship on board
  function placeShip(ship, startingPosition, directionOnBoard) {
    const shipCellsArr = getShipCellsOnBoard(
      ship.size(),
      startingPosition,
      directionOnBoard
    );

    if (shipCellsArr.includes("not a valid cell")) {
      return "invalid cell";
    }

    // before placing it on board, check if any of the coordinates overlap with any of the previous ships placed of the board

    if (shipCellsOccupied.length !== 0) {
      let inValidCell;
      for (let i = 0; i < shipCellsArr.length; i++) {
        const valid = checkForShipOverlap(shipCellsArr[i]);
        if (valid === true) {
          console.log(valid);
          inValidCell = shipCellsArr[i];
          break;
        }
      }
      if (inValidCell) {
        return "ERROR! overlap with another ship!";
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

  // check if a cell is being attacked twice
  function checkCellAttackedTwice(cell) {
    const duplicateAttack = recordShotsOnBoard.some(
      (recordedCell) =>
        recordedCell[0] === cell[0] && recordedCell[1] === cell[1]
    );

    return duplicateAttack;
  }

  // attach a cell; hit, miss or ship sinks
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

  // check if all ships on board have sunk
  function allShipsSunk() {
    return sinkShips === shipsOnBoard.length;
  }

  return {
    grid,
    placeShip,
    receiveAttack,
    allShipsSunk,
    recordShotsOnBoard,
    shipCellsOccupied,
    shipsOnBoard,
  };
};

export default Gameboard;

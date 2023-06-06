import Ship from "../Ship/Ship";
import Gameboard from "../Gameboard/Gameboard";

const Player = (playerName) => {
  const name = playerName;
  const board = Gameboard();

  // attack enemy board
  function attackEnemyBoard(enemy, cell) {
    return enemy.board.receiveAttack(cell);
  }

  function randNum() {
    return Math.floor(Math.random() * 9);
  }

  function checkForDuplicateMove(enemy, move) {
    let currentRandMove = move;
    let duplicate = enemy.board.recordShotsOnBoard.some(
      (shotCell) =>
        shotCell[0] === currentRandMove[0] && shotCell[1] === currentRandMove[1]
    );

    while (duplicate === true) {
      currentRandMove = [randNum(), randNum()];
      duplicate = enemy.board.recordShotsOnBoard.some(
        (shotCell) =>
          shotCell[0] === currentRandMove[0] &&
          shotCell[1] === currentRandMove[1]
      );
    }
    return currentRandMove;
  }

  function AIMove(enemy) {
    const randomCell = [randNum(), randNum()];
    let newRandomCell = randomCell;

    if (enemy.board.recordShotsOnBoard.length !== 0) {
      newRandomCell = checkForDuplicateMove(enemy, randomCell);
    }

    let finalMoveOnEnemyBoard = randomCell;

    if (
      randomCell[0] !== newRandomCell[0] &&
      randomCell[1] !== newRandomCell[1]
    ) {
      finalMoveOnEnemyBoard = newRandomCell;
    }

    return finalMoveOnEnemyBoard;
  }

  function randomPlacementForShips(board) {
    const shipsArr = getShips();
    const finalShipArr = [];
    for (let i = 0; i < shipsArr.length; i++) {
      let cell = [randNum(), randNum()];
      let dir = getRandomShipDirection();

      let placed = board.placeShip(shipsArr[i], cell, dir);

      while (placed.includes("invalid cell") || placed.includes("overlap")) {
        cell = [randNum(), randNum()];
        dir = getRandomShipDirection();
        placed = board.placeShip(shipsArr[i], cell, dir);
      }

      if (!placed.includes("invalid cell") && !placed.includes("overlap")) {
        finalShipArr.push(placed);
      }
    }
    return finalShipArr;
  }

  function getShips() {
    const patrolBoat = Ship("patrol boat", 2);
    const submarine = Ship("submarine", 3);
    const destroyer = Ship("destroyer", 3);
    const battleship = Ship("battleship", 4);
    const carrier = Ship("carrier", 5);

    return [patrolBoat, submarine, destroyer, battleship, carrier];
  }

  function getRandomShipDirection() {
    const direction = ["vertical", "horizontal"];

    const choice = Math.random().toFixed(1);
    return choice < 0.5 ? direction[0] : direction[1];
  }

  return {
    name,
    board,
    attackEnemyBoard,
    AIMove,
    randomPlacementForShips,
  };
};

export default Player;

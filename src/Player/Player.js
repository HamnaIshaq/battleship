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

    while (currentRandMove === move) {
      // eslint-disable-next-line no-loop-func
      enemy.board.recordShotsOnBoard.forEach((shotCell) => {
        if (shotCell[0] === move[0] && shotCell[1] === move[1]) {
          currentRandMove = [randNum(), randNum()];
        }
      });
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
    console.log(finalMoveOnEnemyBoard);

    return finalMoveOnEnemyBoard;
  }

  function randomPlacementForShips(board) {
    const shipsArr = getShips();
    console.log(shipsArr);
    for (let i = 0; i < shipsArr.length; i++) {
      let cell = [randNum(), randNum()];
      const dir = getRandomShipDirection();

      let placed = board.placeShip(shipsArr[i], cell, dir);

      while (
        placed.includes("invalid move") ||
        placed.includes("invalid placement")
      ) {
        cell = [randNum(), randNum()];
        placed = board.placeShip(shipsArr[i], cell, dir);
      }
    }
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
    // console.log(choice < 0.5 ? direction[0] : direction[1]);
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

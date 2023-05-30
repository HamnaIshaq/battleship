import Gameboard from "../Gameboard/Gameboard";

const Player = (playerName) => {
  const name = playerName;
  const board = Gameboard();

  // attack enemy board
  function attackEnemyBoard(enemy, cell) {
    return enemy.board.receiveAttack(cell);
  }

  function randNum() {
    return Math.floor(Math.random() * 10);
  }

  function checkForDuplicateMove(enemy, move) {
    let currentRandMove = move;

    while (currentRandMove === move) {
      // eslint-disable-next-line no-loop-func
      enemy.recordShotsOnBoard.forEach((shotCell) => {
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

    if (enemy.recordShotsOnBoard !== []) {
      newRandomCell = checkForDuplicateMove(enemy, randomCell);
    }

    let finalMoveOnEnemyBoard = randomCell;

    if (
      randomCell[0] !== newRandomCell[0] &&
      randomCell[1] !== newRandomCell[1]
    ) {
      finalMoveOnEnemyBoard = newRandomCell;
    }

    return enemy.board.receiveAttack(finalMoveOnEnemyBoard);
  }

  return {
    name,
    board,
    attackEnemyBoard,
    AIMove,
  };
};

export default Player;

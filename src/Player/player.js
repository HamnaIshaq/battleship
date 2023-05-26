import GameBoard from "../Gameboard/gameboard";

const Player = (name) => {
  let gameBoard = GameBoard();
  let playerName = name;

  function makeMoveOnBoard(enemyGameboard, coords) {
    const move = enemyGameboard.receiveAttack(coords);
    return move;
  }

  function makeRandomMove(enemyGameboard) {
    let randomMove = [randomNum(), randomNum()];
    let newRandomMove = checkForDuplicateMove(enemyGameboard, randomMove);
    let finalMove;

    if (
      randomMove[0] !== newRandomMove[0] &&
      randomMove[1] !== newRandomMove[1]
    ) {
      finalMove = newRandomMove;
    } else {
      finalMove = randomMove;
    }

    return enemyGameboard.receiveAttack(finalMove);
  }

  function checkForDuplicateMove(move) {
    let inValidMove = true;
    let currentRandomMove = move;
    let finalRandomMove;

    while (inValidMove) {
      let newMove = [];
      enemyGameboard.recordShots.forEach((coords) => {
        if (
          coords[0] === currentRandomMove[0] &&
          coords[1] === currentRandomMove[1]
        ) {
          newMove = randomMove = [randomNum(), randomNum()];
        }
      });
      if (newMove.length === 0) {
        inValidMove = false;
        finalRandomMove = currentRandomMove;
      }
      //duplicate move
      if (newMove.length !== 0) {
        inValidMove = true;
        currentRandomMove = newMove;
      }
    }
    return finalRandomMove;
  }

  function randomNum() {
    return Math.floor(Math.random() * 10);
  }

  return {
    makeRandomMove,
    makeMoveOnBoard,
    gameBoard,
    playerName,
  };
};

export default Player;

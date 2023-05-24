import GameBoard from "../Gameboard/gameboard";

const Player = () => {
  let gameBoard = GameBoard();

  function makeMoveOnBoard(coords) {
    const move = gameBoard.receiveAttack(coords);
    return move;
  }

  function makeRandomMove() {
    let randomMove = [randomNum(), randomNum()];
    let newRandomMove = checkForDuplicateMove(randomMove);
    let finalMove;

    if (
      randomMove[0] !== newRandomMove[0] &&
      randomMove[1] !== newRandomMove[1]
    ) {
      finalMove = newRandomMove;
    } else {
      finalMove = randomMove;
    }

    return gameBoard.receiveAttack(finalMove);
  }

  function checkForDuplicateMove(move) {
    let inValidMove = true;
    let currentRandomMove = move;
    let finalRandomMove;

    while (inValidMove) {
      let newMove = [];
      gameBoard.recordShots.forEach((coords) => {
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
  };
};

export default Player;

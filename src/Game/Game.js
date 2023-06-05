import Ship from "../Ship/Ship";
import Player from "../Player/Player";

const Game = (player1Name, player2Name) => {
  const player1 = Player(player1Name);
  const player2 = Player(player2Name);
  let currentPlayer = player1;

  // change player turn
  function changePlayerTurn() {
    if (currentPlayer === player1) {
      currentPlayer = player2;
      return currentPlayer;
    }

    currentPlayer = player1;
    return currentPlayer;
  }

  function endGame() {
    if (player1.board.allShipsSunk()) {
      return `${player2.name} wins!`;
    }

    if (player2.board.allShipsSunk()) {
      return `${player1.name} wins!`;
    }
    return false;
  }

  function player1Ships() {
    const shipsArr = [];

    const player1PatrolBoat = Ship("patrol boat", 2);
    const player1StartingPosition = [0, 0];
    const player1DirectionOnBoard = "horizontal";

    shipsArr.push(
      player1.board.placeShip(
        player1PatrolBoat,
        player1StartingPosition,
        player1DirectionOnBoard
      )
    );

    const player1Submarine = Ship("submarine", 3);
    const player1StartingPositionSubmarine = [5, 0];
    const player1DirectionOnBoardSubmarine = "vertical";

    shipsArr.push(
      player1.board.placeShip(
        player1Submarine,
        player1StartingPositionSubmarine,
        player1DirectionOnBoardSubmarine
      )
    );

    return shipsArr;
  }

  function player2Ships() {
    const shipsArr = [];

    const player2PatrolBoat = Ship("patrol boat", 2);
    const player2StartingPosition = [2, 0];
    const player2DirectionOnBoard = "horizontal";

    shipsArr.push(
      player2.board.placeShip(
        player2PatrolBoat,
        player2StartingPosition,
        player2DirectionOnBoard
      )
    );

    const player2Submarine = Ship("submarine", 3);
    const player2StartingPositionSubmarine = [5, 3];
    const player2DirectionOnBoardSubmarine = "vertical";

    shipsArr.push(
      player2.board.placeShip(
        player2Submarine,
        player2StartingPositionSubmarine,
        player2DirectionOnBoardSubmarine
      )
    );

    return shipsArr;
  }

  return {
    player1,
    player2,
    changePlayerTurn,
    endGame,
    player1Ships,
    player2Ships,
  };
};

export default Game;

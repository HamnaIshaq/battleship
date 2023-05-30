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

  return {
    player1,
    player2,
    changePlayerTurn,
    endGame,
  };
};

export default Game;

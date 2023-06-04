import View from "./view"; // view
import Game from "../Game/Game"; // modal

const Controller = () => {
  const game = Game("player1", "CPU");
  const { player1 } = game;
  const { player2 } = game;
  const currentPlayer = player1;

  const view = View();

  function startGame() {
    showPlayerSide(player1);
    showPlayerSide(player2);

    game.player1Ships();
    placeShips(player1.name, player1.board.shipCellsOccupied);

    game.player2Ships();
    placeShips(player2.name, player2.board.shipCellsOccupied);
  }

  function showPlayerSide(player) {
    const playerName = player.name;
    const playerBoard = player.board.grid();
    // const shipsLocation = player.board.shipCellsOccupied;

    view.makePlayerSideView(playerName, playerBoard);

    /* playerBoard.forEach(cell => {
      view.playerGrid(cell)
    }) */

    // view.makeBoard(player.name, player.board.grid());
  }

  function placeShips(playerName, shipsLocationArr) {
    view.showShipsOnBoard(playerName, shipsLocationArr);
  }

  return {
    startGame,
  };
};

export default Controller;

import Ship from "../Ship/ship";
import Player from "../Player/player";

const Game = (player1Name, player2Name) => {
  let player1 = Player(player1Name);
  let player2 = Player(player2Name);

  placeShips();

  function changePlayerTurn() {}

  function placeShips() {
    player1ShipPlacementTemp();
    player2ShipPlacementTemp();

    //console.log(player1.shipCoords());
  }

  function player1ShipPlacementTemp() {
    const ship1 = Ship(2);
    const coordShip1Start = [0, 0];
    const coordShip1End = [0, 1];
    const ship2 = Ship(3);
    const coordShip2Start = [2, 0];
    const coordShip2End = [2, 2];

    const ship3 = Ship(3);
    const coordShip3Start = [3, 4];
    const coordShip3End = [3, 6];

    player1.gameBoard.placeShip(ship1, coordShip1Start, coordShip1End);

    player1.gameBoard.placeShip(ship2, coordShip2Start, coordShip2End);

    player1.gameBoard.placeShip(ship3, coordShip3Start, coordShip3End);

    return player1.gameBoard;
  }

  function player2ShipPlacementTemp() {
    const ship1 = Ship(2);
    const coordShip1Start = [0, 5];
    const coordShip1End = [0, 6];
    const ship2 = Ship(3);
    const coordShip2Start = [2, 0];
    const coordShip2End = [2, 2];

    player2.gameBoard.placeShip(ship1, coordShip1Start, coordShip1End);

    player2.gameBoard.placeShip(ship2, coordShip2Start, coordShip2End);

    return player2.gameBoard;
  }

  // end game when all ships have sunk
  function endGame() {
    if (player1.gameBoard.allShipsHaveSunk() === "all ships have sunk") {
      return `${player2.name} wins!`;
    } else if (player2.gameBoard.allShipsHaveSunk() === "all ships have sunk") {
      return `${player1.playerName} wins`;
    }
  }

  return {
    player1,
    player2,
    endGame,
  };
};

export default Game;

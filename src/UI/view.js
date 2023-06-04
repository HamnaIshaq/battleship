import "../style.css";
import Game from "../Game/Game"; // modal

const View = () => {
  const game = Game("player1", "CPU");
  const { player1 } = game;
  const { player2 } = game;
  const enemy = player2;
  const currentPlayer = player1;

  function startGame() {
    showPlayerSide(player1);
    showPlayerSide(player2);

    player1.randomPlacementForShips(player1.board);
    placeShips(player1.name, player1.board.shipCellsOccupied);

    player2.randomPlacementForShips(player2.board);

    placeShips(player2.name, player2.board.shipCellsOccupied);
  }

  function showPlayerSide(player) {
    const playerName = player.name;
    const playerBoard = player.board.grid();

    makePlayerSideView(playerName, playerBoard);
  }

  function placeShips(playerName, shipsLocationArr) {
    showShipsOnBoard(playerName, shipsLocationArr);
  }

  function hitCell(e) {
    const cellX = parseInt(e.target.getAttribute("data-cell-x"));
    const cellY = parseInt(e.target.getAttribute("data-cell-y"));

    const attackResult = player2.board.receiveAttack([cellX, cellY]);
    console.log("player1", attackResult);

    if (attackResult === "miss") {
      e.target.classList.add("cell-missed");
    } else if (attackResult === "hit") {
      e.target.classList.add("cell-hit");
    } else {
      e.target.classList.add("cell-hit");
      console.log(attackResult);
    }

    if (game.endGame() === `${player1.name} wins!`) {
      console.log(`${player1.name} wins!`);
      return;
    }

    // currentPlayer = game.changePlayerTurn();
    // enemy = player1;

    AIMoveOnBoard();
  }

  function AIMoveOnBoard() {
    const player1BoardUI = document
      .querySelector(".player1")
      .querySelectorAll(".cell");

    const move = player2.AIMove(player1);
    const attackResult = player1.board.receiveAttack(move);
    console.log("AI", attackResult);
    player1BoardUI.forEach((cell) => {
      const cellX = parseInt(cell.getAttribute("data-cell-x"));
      const cellY = parseInt(cell.getAttribute("data-cell-y"));

      if (move[0] === cellX && move[1] === cellY) {
        if (attackResult === "miss") {
          cell.classList.add("cell-missed");
        }

        if (attackResult === "hit") {
          cell.classList.add("cell-hit");
        }
      }
    });

    // currentPlayer = game.changePlayerTurn();
    // enemy = player2;
  }

  function makePlayerSideView(name, board) {
    const playerContainer = document.createElement("div");
    const playerName = document.createElement("p");
    playerName.textContent = name;
    playerContainer.appendChild(playerName);

    const grid = document.createElement("div");
    grid.classList.add("gameboard");
    grid.classList.add(name);

    board.forEach((cell) => {
      const singleCell = document.createElement("div");
      singleCell.classList.add("cell");
      singleCell.setAttribute("data-cell-x", cell[0]);
      singleCell.setAttribute("data-cell-y", cell[1]);
      if (name !== "player1") {
        singleCell.classList.add("enemy-cell");
        singleCell.addEventListener("click", hitCell, { once: true });
      }

      grid.appendChild(singleCell);
    });

    playerContainer.appendChild(grid);

    const container = document.querySelector(".container");

    container.appendChild(playerContainer);
  }

  function showShipsOnBoard(playerName, shipsLocationArr) {
    const playerBoardUI = document
      .querySelector(`.${playerName}`)
      .querySelectorAll(".cell");

    const shipsArr = shipsLocationArr.flat(1);

    playerBoardUI.forEach((cell) => {
      const cellX = parseInt(cell.getAttribute("data-cell-x"));
      const cellY = parseInt(cell.getAttribute("data-cell-y"));

      shipsArr.forEach((shipCell) => {
        const shipPresence = shipCell[0] === cellX && shipCell[1] === cellY;

        if (shipPresence) {
          cell.classList.add("cell-ship");
        }
      });
    });
  }

  return {
    startGame,
  };
};

export default View;

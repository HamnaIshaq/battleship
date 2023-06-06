import "../style.css";
import Game from "../Game/Game"; // modal

const View = () => {
  let game = Game("player1", "CPU");
  let { player1 } = game;
  let { player2 } = game;
  const enemy = player2;
  const currentPlayer = player1;
  const gameStatus = document.querySelector(".game-status");

  function startGame() {
    gameStatus.textContent = "";
    makePlayerSideView(player1.name, player1.board.grid());

    const player1ShipsArr = player1.randomPlacementForShips(player1.board);
    // game.player1Ships();

    placeShips(player1.name, player1ShipsArr);

    makePlayerSideView(player2.name, player2.board.grid());

    const player2ShipsArr = player2.randomPlacementForShips(player2.board);

    placeShips(player2.name, player2ShipsArr);
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

    if (attackResult === "miss") {
      e.target.classList.add("cell-missed");
    } else if (attackResult === "hit") {
      e.target.classList.add("cell-hit");
    } else {
      e.target.classList.add("cell-hit");
    }

    if (game.endGame() === `${player1.name} wins!`) {
      gameStatus.textContent = "player1 wins!";
      console.log(`${player1.name} wins!`);

      const newGameButton = document.createElement("button");
      newGameButton.setAttribute("type", "button");
      newGameButton.textContent = "Restart Game";

      newGameButton.addEventListener("click", restartGame);

      gameStatus.appendChild(newGameButton);

      return;
    }

    AIMoveOnBoard();
  }

  function AIMoveOnBoard() {
    const player1BoardUI = document
      .querySelector(".player1")
      .querySelectorAll(".cell");

    const move = player2.AIMove(player1);

    const attackResult = player1.board.receiveAttack(move);

    player1BoardUI.forEach((cell) => {
      const cellX = parseInt(cell.getAttribute("data-cell-x"));
      const cellY = parseInt(cell.getAttribute("data-cell-y"));

      if (move[0] === cellX && move[1] === cellY) {
        if (attackResult === "miss") {
          cell.classList.add("cell-missed");
        } else if (attackResult === "hit") {
          cell.classList.add("cell-hit");
        } else {
          cell.classList.add("cell-hit");
        }
      }
    });

    if (game.endGame() === `${player2.name} wins!`) {
      gameStatus.textContent = `${player2.name} wins!`;
      console.log(`${player2.name} wins!`);
    }
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
          /* if (playerName === "CPU") {
            cell.classList.add("hide-ship");
          } */
        }
      });
    });
  }

  function restartGame() {
    game = Game("player1", "CPU");
    player1 = game.player1;
    player2 = game.player2;
    const container = document.querySelector(".container");
    container.innerHTML = "";
    startGame();
  }

  return {
    startGame,
  };
};

export default View;

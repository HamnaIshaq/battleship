import Game from "../Game/game";

const View = () => {
  let game = Game("player1", "computer");

  function createGridForPlayer1() {
    const board1 = game.player1.gameBoard.gameBoard;

    const grid = document.createElement("div");
    grid.classList.add("gameboard");

    let count = 0;
    let cellContainer;
    board1.forEach((arr1) => {
      if (count === 0) {
        cellContainer = document.createElement("div");
        cellContainer.classList.add("cell-row");
      }
      if (arr1[1] <= 9 && count !== 9) {
        count++;
      } else {
        count = 0;
        grid.appendChild(cellContainer);
      }

      const cell = document.createElement("button");
      cell.classList.add("cell");
      cell.setAttribute("data-cell-x", arr1[0]);
      cell.setAttribute("data-cell-y", arr1[1]);
      cell.addEventListener("click", hitCell, { once: true });
      cellContainer.appendChild(cell);

      const show = showShipPlacement(arr1[0], arr1[1]);

      if (show) {
        cell.classList.add("cell-ship");
      }
    });

    return grid;
  }

  function showShipPlacement(x, y) {
    const ships = game.player1.gameBoard.shipCoords();
    let show = false;
    ships.forEach((ship) => {
      if (ship[0] === x && ship[1] === y) {
        show = true;
      }
    });
    return show;
  }

  function createGridForPlayer2() {
    const board2 = game.player2.gameBoard.gameBoard;

    const grid = document.createElement("div");
    grid.classList.add("gameboard");
    //grid.addEventListener("click", hitCell);

    let count = 0;
    let cellContainer;
    board2.forEach((arr1) => {
      if (count === 0) {
        cellContainer = document.createElement("div");
        cellContainer.classList.add("cell-row");
      }
      if (arr1[1] <= 9 && count !== 9) {
        count++;
      } else {
        count = 0;
        grid.appendChild(cellContainer);
      }

      const cell = document.createElement("button");
      cell.classList.add("cell");
      cell.setAttribute("data-cell-x", arr1[0]);
      cell.setAttribute("data-cell-y", arr1[1]);
      cell.addEventListener("click", hitCell, { once: true });
      cellContainer.appendChild(cell);
    });

    return grid;
  }

  function player1Side() {
    const boardPlayer1 = createGridForPlayer1();

    const nameContainer = document.createElement("div");
    nameContainer.classList.add("text-align-center");
    const namePara = document.createElement("p");

    nameContainer.appendChild(namePara);
    namePara.textContent = game.player1.playerName;

    const side = document.createElement("div");

    side.appendChild(boardPlayer1);
    side.appendChild(nameContainer);

    return side;
  }

  function player2Side() {
    const boardPlayer2 = createGridForPlayer2();

    const nameContainer = document.createElement("div");
    nameContainer.classList.add("text-align-center");
    const namePara = document.createElement("p");

    nameContainer.appendChild(namePara);
    namePara.textContent = game.player2.playerName;

    const side = document.createElement("div");

    side.appendChild(boardPlayer2);
    side.appendChild(nameContainer);

    return side;
  }

  function hitCell(e) {
    const x = parseInt(e.target.getAttribute("data-cell-x"));
    const y = parseInt(e.target.getAttribute("data-cell-y"));

    const enemyBoard = game.player2.gameBoard;

    const attackCell = [x, y];

    const attackStatus = enemyBoard.receiveAttack(attackCell);

    if (attackStatus === "missed") {
      e.target.classList.add("cell-missed");
    } else if (attackStatus === "ship was hit!") {
      e.target.classList.add("cell-hit");
    } else if (attackStatus === "ship has sunk!") {
      e.target.classList.add("cell-hit");
      console.log("ship has sunk");
    }
    if (enemyBoard.allShipsHaveSunk() === "all ships have sunk") {
      console.log("player 1 wins");
    }
  }

  function gameView() {
    const parent = document.createElement("div");
    parent.classList.add("container");

    parent.appendChild(player1Side());
    parent.appendChild(player2Side());

    return parent;
  }

  return {
    gameView,
  };
};

export default View;

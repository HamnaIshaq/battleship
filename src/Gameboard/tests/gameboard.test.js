import Ship from "../../Ship/ship";
import GameBoard from "../gameboard";

describe("Gameboard tests", () => {
  test("Place a ship of length 2 at co-ordinates (0, 0) and (0, 1)", () => {
    const ship = Ship(2);
    const gameBoard = GameBoard();
    const coord1 = [0, 0];
    const coord2 = [0, 1];
    const endRes = [
      [0, 0],
      [0, 1],
    ];
    expect(gameBoard.placeShip(ship, coord1, coord2).toString()).toBe(
      endRes.toString()
    );
  });
  test("An attack on cell (0, 1) will hit the ship", () => {
    const ship = Ship(2);
    const gameBoard = GameBoard();
    const coord1 = [0, 0];
    const coord2 = [0, 1];
    const endRes = [
      [0, 0],
      [0, 1],
    ];
    expect(gameBoard.placeShip(ship, coord1, coord2).toString()).toBe(
      endRes.toString()
    );
    expect(gameBoard.receiveAttack([0, 1])).toBe("ship was hit!");
  });

  test("An attack on cell (1, 1) will be recorded as there is no ship present", () => {
    const ship = Ship(2);
    const gameBoard = GameBoard();
    const coord1 = [0, 0];
    const coord2 = [0, 1];
    const endRes = [
      [0, 0],
      [0, 1],
    ];
    expect(gameBoard.placeShip(ship, coord1, coord2).toString()).toBe(
      endRes.toString()
    );
    expect(gameBoard.receiveAttack([1, 1])).toBe("missed");
  });

  test("All ships in gameboard have sunk", () => {
    const ship1 = Ship(2);
    const gameBoard = GameBoard();
    const coord1 = [0, 0];
    const coord2 = [0, 1];
    const endRes = [
      [0, 0],
      [0, 1],
    ];
    expect(gameBoard.placeShip(ship1, coord1, coord2).toString()).toBe(
      endRes.toString()
    );
    expect(gameBoard.receiveAttack([0, 0])).toBe("ship was hit!");
    expect(gameBoard.receiveAttack([0, 1])).toBe("ship was hit!");
    expect(gameBoard.allShipsHaveSunk()).toBe("all ships have sunk");
  });

  /*test("An attack on cell (0, 0) and (0, 1) will sink the ship", () => {
    const ship = Ship(2);
    const gameBoard = GameBoard();
    const coord1 = [0, 0];
    const coord2 = [0, 1];
    const endRes = [
      [0, 0],
      [0, 1],
    ];
    expect(gameBoard.placeShip(ship, coord1, coord2).toString()).toBe(
      endRes.toString()
    );
    expect(gameBoard.receiveAttack([0, 0])).toBe("ship was hit!");
    expect(gameBoard.receiveAttack([0, 1])).toBe("ship was hit!");
    expect(gameBoard.shipHasSunk()).toBe("ship has sunk!");
  });*/
});

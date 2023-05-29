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

  /*test("Place a ship of length 2 at co-ordinates (0, 0) and (0, 1) then placing another ship on similar coordinates, will give an error", () => {
    const ship = Ship(2);
    const gameBoard = GameBoard();
    const coord1 = [0, 0];
    const coord2 = [0, 1];
    const endRes = [
      [0, 0],
      [0, 1],
    ];
    const ship2 = Ship(2);
    const ship2Coord1 = [0, 0];
    const ship2Coord2 = [0, 1];
    expect(gameBoard.placeShip(ship, coord1, coord2).toString()).toBe(
      endRes.toString()
    );
    expect(gameBoard.placeShip(ship2, ship2Coord1, ship2Coord2)).toBe(
      "ERROR: cannot place ship on top of another ship!"
    );
  });*/

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
    expect(gameBoard.receiveAttack([0, 1])).toBe("ship has sunk!");
    expect(gameBoard.allShipsHaveSunk()).toBe("all ships have sunk");
  });

  test("An attack on cell (0, 0) twice cannot be made", () => {
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
    expect(gameBoard.receiveAttack([0, 0])).toBe(
      "cannot attach twice on the same coordinate"
    );
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

import Ship from "../../Ship/ship";
import GameBoard from "../gameboard";

const ship = Ship(2);
const gameBoard = GameBoard();

describe("Gameboard tests", () => {
  test("Place a ship of length 2 at co-ordinates (0, 0) and (0, 1)", () => {
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

  test("An attack on cell (1, 1) will be recorded as there is no ship present", () => {
    expect(gameBoard.receiveAttack([1, 1])).toBe("missed");
  });
});

import Ship from "../../Ship/ship";
import Player from "../player";

describe("Player tests", () => {
  test("player misses the ship on player board after hitting cell [0, 5]", () => {
    const playerHuman = Player();
    const computer = Player();
    const ship1 = Ship(2);
    const coordShip1Start = [0, 0];
    const coordShip1End = [0, 1];
    const endResShip1 = [
      [0, 0],
      [0, 1],
    ];
    const ship2 = Ship(3);
    const coordShip2Start = [2, 0];
    const coordShip2End = [2, 2];
    const endResShip2 = [
      [2, 0],
      [2, 2],
    ];
    expect(
      playerHuman.gameBoard
        .placeShip(ship1, coordShip1Start, coordShip1End)
        .toString()
    ).toBe(endResShip1.toString());
    expect(
      playerHuman.gameBoard
        .placeShip(ship2, coordShip2Start, coordShip2End)
        .toString()
    ).toBe(endResShip2.toString());

    expect(
      computer.gameBoard
        .placeShip(ship1, coordShip1Start, coordShip1End)
        .toString()
    ).toBe(endResShip1.toString());
    expect(
      computer.gameBoard
        .placeShip(ship2, coordShip2Start, coordShip2End)
        .toString()
    ).toBe(endResShip2.toString());

    expect(playerHuman.makeMoveOnBoard(computer.gameBoard, [0, 5])).toBe(
      "missed"
    );
  });

  test("player hits the ship on player board after hitting cell [0, 0]", () => {
    const playerHuman = Player();
    const computer = Player();

    const ship1 = Ship(2);
    const coordShip1Start = [0, 0];
    const coordShip1End = [0, 1];
    const endResShip1 = [
      [0, 0],
      [0, 1],
    ];
    const ship2 = Ship(3);
    const coordShip2Start = [2, 0];
    const coordShip2End = [2, 2];
    const endResShip2 = [
      [2, 0],
      [2, 2],
    ];
    expect(
      playerHuman.gameBoard
        .placeShip(ship1, coordShip1Start, coordShip1End)
        .toString()
    ).toBe(endResShip1.toString());
    expect(
      playerHuman.gameBoard
        .placeShip(ship2, coordShip2Start, coordShip2End)
        .toString()
    ).toBe(endResShip2.toString());

    expect(
      computer.gameBoard
        .placeShip(ship1, coordShip1Start, coordShip1End)
        .toString()
    ).toBe(endResShip1.toString());
    expect(
      computer.gameBoard
        .placeShip(ship2, coordShip2Start, coordShip2End)
        .toString()
    ).toBe(endResShip2.toString());

    expect(playerHuman.makeMoveOnBoard(computer.gameBoard, [0, 0])).toBe(
      "ship was hit!"
    );
  });

  test("player sinks the ship on player board after hitting cell [0, 0] and [0, 1]", () => {
    const playerHuman = Player();
    const computer = Player();
    const ship1 = Ship(2);
    const coordShip1Start = [0, 0];
    const coordShip1End = [0, 1];
    const endResShip1 = [
      [0, 0],
      [0, 1],
    ];
    const ship2 = Ship(3);
    const coordShip2Start = [2, 0];
    const coordShip2End = [2, 2];
    const endResShip2 = [
      [2, 0],
      [2, 2],
    ];
    expect(
      playerHuman.gameBoard
        .placeShip(ship1, coordShip1Start, coordShip1End)
        .toString()
    ).toBe(endResShip1.toString());
    expect(
      playerHuman.gameBoard
        .placeShip(ship2, coordShip2Start, coordShip2End)
        .toString()
    ).toBe(endResShip2.toString());

    expect(
      computer.gameBoard
        .placeShip(ship1, coordShip1Start, coordShip1End)
        .toString()
    ).toBe(endResShip1.toString());
    expect(
      computer.gameBoard
        .placeShip(ship2, coordShip2Start, coordShip2End)
        .toString()
    ).toBe(endResShip2.toString());

    expect(playerHuman.makeMoveOnBoard(computer.gameBoard, [0, 0])).toBe(
      "ship was hit!"
    );
    expect(playerHuman.makeMoveOnBoard(computer.gameBoard, [0, 1])).toBe(
      "ship has sunk!"
    );
  });
  /*
  test("computer move the ship on player board after hitting cell [0, 0] and [0, 1]", () => {
    const playerHuman = Player();
    const computer = Player();

    const ship1 = Ship(2);
    const coordShip1Start = [0, 0];
    const coordShip1End = [0, 1];
    const endResShip1 = [
      [0, 0],
      [0, 1],
    ];
    const ship2 = Ship(3);
    const coordShip2Start = [2, 0];
    const coordShip2End = [2, 2];
    const endResShip2 = [
      [2, 0],
      [2, 2],
    ];
    expect(
      playerHuman.gameBoard
        .placeShip(ship1, coordShip1Start, coordShip1End)
        .toString()
    ).toBe(endResShip1.toString());
    expect(
      playerHuman.gameBoard
        .placeShip(ship2, coordShip2Start, coordShip2End)
        .toString()
    ).toBe(endResShip2.toString());

    expect(
      computer.gameBoard
        .placeShip(ship1, coordShip1Start, coordShip1End)
        .toString()
    ).toBe(endResShip1.toString());
    expect(
      computer.gameBoard
        .placeShip(ship2, coordShip2Start, coordShip2End)
        .toString()
    ).toBe(endResShip2.toString());

    expect(playerHuman.makeMoveOnBoard(computer.gameBoard, [0, 0])).toBe("ship was hit!");
    // below will give a random move. it will either hit the ship/ miss or sink the ship if called enough times
    //expect(playerHuman.makeRandomMove(computer.gameBoard)).toBe("missed");
  });*/
});

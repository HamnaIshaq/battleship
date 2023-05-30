import Ship from "../../Ship/Ship";
import Player from "../Player";

describe("Player tests", () => {
  test('create 1 player with name "Alice" and a 10x10 grid', () => {
    const player1 = Player("Alice");

    const expectedBoard = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
      [0, 9],
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
      [1, 8],
      [1, 9],
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
      [2, 8],
      [2, 9],
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
      [3, 8],
      [3, 9],
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [4, 8],
      [4, 9],
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
      [5, 8],
      [5, 9],
      [6, 0],
      [6, 1],
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
      [6, 8],
      [6, 9],
      [7, 0],
      [7, 1],
      [7, 2],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
      [7, 7],
      [7, 8],
      [7, 9],
      [8, 0],
      [8, 1],
      [8, 2],
      [8, 3],
      [8, 4],
      [8, 5],
      [8, 6],
      [8, 7],
      [8, 8],
      [8, 9],
      [9, 0],
      [9, 1],
      [9, 2],
      [9, 3],
      [9, 4],
      [9, 5],
      [9, 6],
      [9, 7],
      [9, 8],
      [9, 9],
    ];

    expect(player1.name).toBe("Alice");
    expect(player1.board.grid()).toStrictEqual(expectedBoard);
  });

  test('create 2 players; player1 with name "Alice" with a 10x10 grid. player2 with name "Enemy" with a 10x10 grid as well', () => {
    const player1 = Player("Alice");

    const expectedBoard = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
      [0, 9],
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
      [1, 8],
      [1, 9],
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
      [2, 8],
      [2, 9],
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
      [3, 8],
      [3, 9],
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [4, 8],
      [4, 9],
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
      [5, 8],
      [5, 9],
      [6, 0],
      [6, 1],
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
      [6, 8],
      [6, 9],
      [7, 0],
      [7, 1],
      [7, 2],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
      [7, 7],
      [7, 8],
      [7, 9],
      [8, 0],
      [8, 1],
      [8, 2],
      [8, 3],
      [8, 4],
      [8, 5],
      [8, 6],
      [8, 7],
      [8, 8],
      [8, 9],
      [9, 0],
      [9, 1],
      [9, 2],
      [9, 3],
      [9, 4],
      [9, 5],
      [9, 6],
      [9, 7],
      [9, 8],
      [9, 9],
    ];

    expect(player1.name).toBe("Alice");
    expect(player1.board.grid()).toStrictEqual(expectedBoard);

    const player2 = Player("Enemy");

    expect(player2.name).toBe("Enemy");
    expect(player2.board.grid()).toStrictEqual(expectedBoard);
  });

  test('create 2 players; player1 with name "Alice" with a 10x10 grid. player2 with name "Enemy" with a 10x10 grid as well. player1 "Alice" places a patrol boat of size 2 on her board horizontally  with starting position [0,0], and player2 "Enemy" playes a patrol board of size 2 on his board horizontally on starting position [2, 0].', () => {
    const player1 = Player("Alice");

    const expectedBoard = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
      [0, 9],
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
      [1, 8],
      [1, 9],
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
      [2, 8],
      [2, 9],
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
      [3, 8],
      [3, 9],
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [4, 8],
      [4, 9],
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
      [5, 8],
      [5, 9],
      [6, 0],
      [6, 1],
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
      [6, 8],
      [6, 9],
      [7, 0],
      [7, 1],
      [7, 2],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
      [7, 7],
      [7, 8],
      [7, 9],
      [8, 0],
      [8, 1],
      [8, 2],
      [8, 3],
      [8, 4],
      [8, 5],
      [8, 6],
      [8, 7],
      [8, 8],
      [8, 9],
      [9, 0],
      [9, 1],
      [9, 2],
      [9, 3],
      [9, 4],
      [9, 5],
      [9, 6],
      [9, 7],
      [9, 8],
      [9, 9],
    ];

    expect(player1.name).toBe("Alice");
    expect(player1.board.grid()).toStrictEqual(expectedBoard);

    const player2 = Player("Enemy");

    expect(player2.name).toBe("Enemy");
    expect(player2.board.grid()).toStrictEqual(expectedBoard);

    const player1PatrolBoat = Ship("patrol boat", 2);
    const player1StartingPosition = [0, 0];
    const player1DirectionOnBoard = "horizontal";
    const player1FinalBoardPosition = [
      [0, 0],
      [0, 1],
    ];

    expect(
      player1.board.placeShip(
        player1PatrolBoat,
        player1StartingPosition,
        player1DirectionOnBoard
      )
    ).toStrictEqual(player1FinalBoardPosition);

    const player2PatrolBoat = Ship("patrol boat", 2);
    const player2StartingPosition = [2, 0];
    const player2DirectionOnBoard = "horizontal";
    const player2FinalBoardPosition = [
      [2, 0],
      [2, 1],
    ];

    expect(
      player2.board.placeShip(
        player2PatrolBoat,
        player2StartingPosition,
        player2DirectionOnBoard
      )
    ).toStrictEqual(player2FinalBoardPosition);
  });

  test('create 2 players; player1 with name "Alice" with a 10x10 grid. player2 with name "Enemy" with a 10x10 grid as well. player1 "Alice" places a patrol boat of size 2 on her board horizontally  with starting position [0,0], and player2 "Enemy" playes a patrol board of size 2 on his board horizontally on starting position [2, 0]. Player1 attacks cell [2, 0] on player2 board and hits the ship. Player2 attacks cell [1, 1] on player1 board and misses. Player1 attacks cell [2, 1] and sinks patrol boat effectively sinking all ships on player2 board', () => {
    const player1 = Player("Alice");

    const expectedBoard = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
      [0, 9],
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
      [1, 8],
      [1, 9],
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
      [2, 8],
      [2, 9],
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
      [3, 8],
      [3, 9],
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [4, 8],
      [4, 9],
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
      [5, 8],
      [5, 9],
      [6, 0],
      [6, 1],
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
      [6, 8],
      [6, 9],
      [7, 0],
      [7, 1],
      [7, 2],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
      [7, 7],
      [7, 8],
      [7, 9],
      [8, 0],
      [8, 1],
      [8, 2],
      [8, 3],
      [8, 4],
      [8, 5],
      [8, 6],
      [8, 7],
      [8, 8],
      [8, 9],
      [9, 0],
      [9, 1],
      [9, 2],
      [9, 3],
      [9, 4],
      [9, 5],
      [9, 6],
      [9, 7],
      [9, 8],
      [9, 9],
    ];

    expect(player1.name).toBe("Alice");
    expect(player1.board.grid()).toStrictEqual(expectedBoard);

    const player2 = Player("Enemy");

    expect(player2.name).toBe("Enemy");
    expect(player2.board.grid()).toStrictEqual(expectedBoard);

    const player1PatrolBoat = Ship("patrol boat", 2);
    const player1StartingPosition = [0, 0];
    const player1DirectionOnBoard = "horizontal";
    const player1FinalBoardPosition = [
      [0, 0],
      [0, 1],
    ];

    expect(
      player1.board.placeShip(
        player1PatrolBoat,
        player1StartingPosition,
        player1DirectionOnBoard
      )
    ).toStrictEqual(player1FinalBoardPosition);

    const player2PatrolBoat = Ship("patrol boat", 2);
    const player2StartingPosition = [2, 0];
    const player2DirectionOnBoard = "horizontal";
    const player2FinalBoardPosition = [
      [2, 0],
      [2, 1],
    ];

    expect(
      player2.board.placeShip(
        player2PatrolBoat,
        player2StartingPosition,
        player2DirectionOnBoard
      )
    ).toStrictEqual(player2FinalBoardPosition);

    expect(player1.attackEnemyBoard(player2, [2, 0])).toBe("hit");
    expect(player2.board.allShipsSunk()).toBe(false);

    // expect(player2.AIMove(player1)).toBe("miss");
    expect(player2.attackEnemyBoard(player1, [1, 1])).toBe("miss");
    expect(player1.board.allShipsSunk()).toBe(false);

    expect(player1.attackEnemyBoard(player2, [2, 1])).toBe(
      "patrol boat has sunk!"
    );
    expect(player2.board.allShipsSunk()).toBe(true);
  });
});

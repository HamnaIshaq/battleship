import Ship from "../../Ship/Ship";
import Game from "../Game";

describe("Game tests", () => {
  test('create a game with 2 players names "Alice" and "Enemy"', () => {
    const game = Game("Alice", "Enemy");

    expect(game.player1.name).toBe("Alice");
    expect(game.player2.name).toBe("Enemy");
  });

  test('create a game with 2 players names "Alice" and "Enemy" and add 1 patrol boat on player1 board on starting position [0, 0] horizontally and 1 patrol boat on player2 boat horiuontally on starting position [2, 0]. Change player after each attack. final winner is ', () => {
    const game = Game("Alice", "Enemy");

    expect(game.player1.name).toBe("Alice");
    expect(game.player2.name).toBe("Enemy");

    const player1PatrolBoat = Ship("patrol boat", 2);
    const player1StartingPosition = [0, 0];
    const player1DirectionOnBoard = "horizontal";
    const player1FinalBoardPosition = [
      [0, 0],
      [0, 1],
    ];

    expect(
      game.player1.board.placeShip(
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
      game.player2.board.placeShip(
        player2PatrolBoat,
        player2StartingPosition,
        player2DirectionOnBoard
      )
    ).toStrictEqual(player2FinalBoardPosition);

    let currentPlayer = game.player1;
    // attack board

    expect(currentPlayer.attackEnemyBoard(game.player2, [2, 0])).toBe("hit");
    expect(game.player2.board.allShipsSunk()).toBe(false);

    expect(game.endGame()).toBe(false);

    currentPlayer = game.changePlayerTurn();

    expect(currentPlayer).toBe(game.player2);

    expect(currentPlayer.attackEnemyBoard(game.player1, [0, 0])).toBe("hit");
    expect(game.player1.board.allShipsSunk()).toBe(false);
    expect(game.endGame()).toBe(false);
    currentPlayer = game.changePlayerTurn();

    expect(currentPlayer).toBe(game.player1);

    expect(currentPlayer.attackEnemyBoard(game.player2, [2, 1])).toBe(
      "patrol boat has sunk!"
    );
    expect(game.player2.board.allShipsSunk()).toBe(true);

    // end game now

    expect(game.endGame()).toBe(`${game.player1.name} wins!`);

    /*
    // expect(player2.AIMove(player1)).toBe("miss");
    expect(game.player2.attackEnemyBoard(game.player1, [1, 1])).toBe("miss");
    expect(game.player1.board.allShipsSunk()).toBe(false); */
  });
});

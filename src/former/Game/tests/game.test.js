import Ship from '../../Ship/ship';
import Game from '../game';

describe('Game tests', () => {
  test('game round', () => {
    const game = Game('player1', 'computer');

    const {player1} = game;
    const {player2} = game;

    const currentPlayer = player1;

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
      player1.gameBoard
        .placeShip(ship1, coordShip1Start, coordShip1End)
        .toString()
    ).toBe(endResShip1.toString());
    expect(
      player1.gameBoard
        .placeShip(ship2, coordShip2Start, coordShip2End)
        .toString()
    ).toBe(endResShip2.toString());

    const player2ship1 = Ship(2);
    const player2coordShip1Start = [0, 5];
    const player2coordShip1End = [0, 6];
    const player2endResShip1 = [
      [0, 5],
      [0, 6],
    ];
    const player2ship2 = Ship(4);
    const player2coordShip2Start = [2, 2];
    const player2coordShip2End = [2, 5];
    const player2endResShip2 = [
      [2, 2],
      [2, 5],
    ];
    expect(
      player2.gameBoard
        .placeShip(player2ship1, player2coordShip1Start, player2coordShip1End)
        .toString()
    ).toBe(player2endResShip1.toString());
    expect(
      player2.gameBoard
        .placeShip(player2ship2, player2coordShip2Start, player2coordShip2End)
        .toString()
    ).toBe(player2endResShip2.toString());

    expect(currentPlayer.makeMoveOnBoard(player2.gameBoard, [0, 5])).toBe(
      'ship was hit!'
    );

    /*

    currentPlayer = game.changePlayerTurn(currentPlayer);

    expect(currentPlayer).toBe(player2);

    expect(currentPlayer.makeMoveOnBoard(player1.gameBoard, [0, 5])).toBe(
      "missed"
    );

    currentPlayer = game.changePlayerTurn(currentPlayer);

    expect(currentPlayer).toBe(player1);
    expect(currentPlayer.makeMoveOnBoard(player2.gameBoard, [0, 6])).toBe(
      "ship has sunk!"
    );

    currentPlayer = game.changePlayerTurn(currentPlayer);

    expect(currentPlayer).toBe(player2);
    expect(currentPlayer.makeMoveOnBoard(player1.gameBoard, [0, 0])).toBe(
      "ship was hit!"
    );
    currentPlayer = game.changePlayerTurn(currentPlayer);

    expect(currentPlayer).toBe(player1);
    expect(currentPlayer.makeMoveOnBoard(player2.gameBoard, [2, 2])).toBe(
      "ship was hit!"
    );

    currentPlayer = game.changePlayerTurn(currentPlayer);

    expect(currentPlayer).toBe(player2);
    expect(currentPlayer.makeMoveOnBoard(player1.gameBoard, [0, 1])).toBe(
      "ship has sunk!"
    );
    currentPlayer = game.changePlayerTurn(currentPlayer);

    expect(currentPlayer).toBe(player1);
    expect(currentPlayer.makeMoveOnBoard(player2.gameBoard, [2, 3])).toBe(
      "ship was hit!"
    );
    currentPlayer = game.changePlayerTurn(currentPlayer);

    expect(currentPlayer).toBe(player2);
    expect(currentPlayer.makeMoveOnBoard(player1.gameBoard, [0, 9])).toBe(
      "missed"
    );
    currentPlayer = game.changePlayerTurn(currentPlayer);

    expect(currentPlayer).toBe(player1);
    expect(currentPlayer.makeMoveOnBoard(player2.gameBoard, [2, 4])).toBe(
      "ship has sunk!"
    );
    currentPlayer = game.changePlayerTurn(currentPlayer);

    expect(currentPlayer).toBe(player2);
    expect(currentPlayer.makeMoveOnBoard(player1.gameBoard, [0, 7])).toBe(
      "missed"
    );

    expect(game.endGame()).toBe("player1 wins"); */
  });
});

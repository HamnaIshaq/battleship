import Ship from '../Ship/ship';
import Game from '../Game/game';

const GameStart = () => {
  const newGame = Game('player1', 'computer');

  const {player1} = newGame;
  const {player2} = newGame;

  const ship1 = Ship(2);
  const coordShip1Start = [0, 0];
  const coordShip1End = [0, 1];

  const ship2 = Ship(3);
  const coordShip2Start = [2, 0];
  const coordShip2End = [2, 2];

  player1.gameBoard.placeShip(ship1, coordShip1Start, coordShip1End);
  player1.gameBoard.placeShip(ship2, coordShip2Start, coordShip2End);

  const player2ship1 = Ship(2);
  const player2coordShip1Start = [0, 5];
  const player2coordShip1End = [0, 6];

  const player2ship2 = Ship(3);
  const player2coordShip2Start = [2, 2];
  const player2coordShip2End = [2, 4];

  player2.gameBoard.placeShip(
    player2ship1,
    player2coordShip1Start,
    player2coordShip1End
  );
  player2.gameBoard.placeShip(
    player2ship2,
    player2coordShip2Start,
    player2coordShip2End
  );

  return {
    newGame,
    player1,
    player2,
  };
};

export default GameStart;

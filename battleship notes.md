# BattleShip Notes

## To Use

- use the webpack template with jest added to it (DONE)
- study about the pub sub design pattern and try to add this in this project
- try to complete this project in this week (till 21-05-2023)
- use factory function for this project (revise this as i havent used this alot)

## THINGS TO KEEP IN MIND

- Write a test, then make it pass
- Try to seperate the app functionality from DOM manipulation
- You can use mocks to make sure that DOM methods like appendChild are being called, but try your best to keep those things outside of the app logic.

## PROJECT LOGIC

### Ship logic

- multiple ships of varying sizes
  - ship length
  - number of times ship is hit()
  - ship has sunk of not isSunk()

### Gameboard logic

- A grid container for gameboard
  - place ships at specific co-ordinates by calling ship factory function
  - gameboard has a receiveAttack ftn
    - takes a pair of (x,y) co-ordinates
    - determines which co-ordinate was hit
    - bassed on the co-ordinates hit, check if a ship was present there
    - if ship was present, hit the ship
    - if ship was not present, record the co-ordinates hit
  - keep track of missed attacks so that they can be displayed properly afterwards
  - report if all ships in gameboard have been sunk or not

#### Gameboard array

lets make a 10 x 10 grid for [Battleship](<https://en.wikipedia.org/wiki/Battleship_(game)>). We will make a 2d array. (DONE)
to place a ship in the gameboard, we first need the ship
lets say the ship is of length 4 and we want to place it at co-ordinates (0,0) (starting point) and (0, 4) (ending point).
for the test
we will first make the ship to be of this length
give the coordinates and the ship to the gameboard
then place it (maybe?)

- A hit on the board
  When a cell is hit, we want to see if a ship was present the ship will be hit
  if hit cell has no ship, then tell that ship was missed

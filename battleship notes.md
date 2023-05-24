# BattleShip Notes

## To Use

- use the webpack template with jest added to it (DONE)
- study about the pub sub design pattern and try to add this in this project
- try to complete this project in this week
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

### Rough Plan for ship placement on gameboard

when a ship is placed on the gameboard

we will record the ship placement on the board as well as the ship info (length, has it sunk or not, has it been hit or not) and starting and ending coordinates

so
shipPlacement will have

1. ship info
2. gameboard coordinates (lets make it an array with all the coordinates start till end)

when we are placing the ship, we are only taking the starting and ending coordinates
as input so how will we determine the middle coordinates?

we will first try and see which of the coordinate is static i.e. not changing
then for the coordinate that is not static we will increment it until we reach the end coordinate

e.g

[0, 0] to [0, 4]

first we determine the static coordinate
it is x axis
then we take the other coordinate i.e. y
and increment it until we reach the end
x = 0;
x = x + 1
mid-Coord = [0, 1]
add the mid-Coord to array of gameboard coordinates
is x equal to 4?
No repeat the above process

### Player

game is played with 1 human player and 1 computer player
each will have their own gameboard and ships on their respective boards

computer player:

we will make the computer with Math random to get a random coordinate of gameboard

we will also check if a computer move has already been executed, if it has, we will generate a new move

human player:
for now we will manually give the coords as input

## rought plan for player

for now there are 2 ways to make move by a player

1. make a random move (math.random maybe)
2. pass coordinate as input to a function

the random will will be used by computer while the 2nd one by human player

now, how to connect player to gamboard?

maybe give the player gameboard when creating it?
then when the player is going to make a move we can check if a ship is present at that move on gameboard. if move misses ship, we will same the missed shot coordinate in gameboard

for computer move

we first need to get a random coordinate to hit
if the coordinate has already been hit once, get a new coordinate
check if new coordinate has already been hit
keep checking until we get a coordinate that has not been hit already

### Game Module Logic To Add

game module will contain the following

1. make 2 players
2. change player on each turn (maybe this goes here)
3. use only methods from other modules (player, gameboard, ship)
4. do not make a new function (If at any point you are tempted to write a new function inside the game loop, step back and figure out which class or module that function should belong to.)
5. game ends when one players ships have all sunk.

### DOM Module Logic To Add

1. display each players board
2. render them using information from gameboard class
3. render gameboard
4. take user input for attacking

I think i will not add pub sub in this project as this will take additional time and I need to focus on the project requirement. Will look into this later

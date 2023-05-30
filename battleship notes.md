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

testing game module

to test the game module, i need to define 2 players, place ships for each player on their gameboard
then attack the coordinates by harcoding the coordinates for now to see if the functionality is working as we want it to

noticed a bug when testing the functionality for game

currently i have a player attacking its own gameboard and not the opposing player gameboard

so

### DOM Module Logic To Add

1. display each players board
2. render them using information from gameboard class
3. render gameboard
4. take user input for attacking

I think i will not add pub sub in this project as this will take additional time and I need to focus on the project requirement. Will look into this later

### 29-02-2023

Made all the logic but there is an error that I cannot find that doesnt allow for the game to end. Couldnt find the error, so I was thinking to restart the project by documenting each step this time to fix the error and write code in a different way as well.

I will tuck away all the previous logic in a folder called former to not loose it for now.

but before making a new ship module, I want to include eslint and prettier configuration in this project as well.

- Made changes to the package.json file to include eslint and prettier as dev dependencies.
- Included their related files
- Changed the name, description and repository url in package.json file for battleship

I will write a script to run linter in package.json

`"lint": "eslint --fix src/**/*.js"`

Starting with the Ship module

- From the battleship wikipedia, there are 5 different types of ships with different sizes as listed below:

| No. | Class of Ship | Size |
| --- | ------------- | ---- |
| 1.  | Carrier       | 5    |
| 2.  | Battleship    | 4    |
| 3.  | Destroyer     | 3    |
| 4.  | Submarine     | 3    |
| 5.  | Patrol Boat   | 2    |

### Ship Module logic

Reading the project description it says:

`sh
‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.

Ships should have a hit() function that increases the number of ‘hits’ in your ship.

isSunk() should be a function that calculates it based on their length and the number of ‘hits’.
`

So the ship module will return an object and will have these methods

First, I will need to write a test for ship to check ship length and also give the ship a name to identify it easily

ship object will have a

- name,
- size (length),
- hit method,
- isSink method

#### Ship testing

Test the following

- for a ship defined, are we getting the size that we want?
- is a ship hit once?
- is a ship hit until its size has been reached?
- we cannot hit a ship more than its size
- ship sinks after it has been hit the same number of times as its size
- does the ship sink? boolean (yes/no)

Wrote logic for all above tests and tested them for each ship type/ class. All tests are being passed. So, I think ship module is done!

Now moving on to the Gameboard module

### Gameboard Module

the gameboard is where we will place our ships and attack them

so first think that we need is a board.

From https://en.wikipedia.org/wiki/Battleship_(game)#Description we see that the usually a battleship board is of size 10x10 and the columns and rows are identified by letters and numbers respectively.

- make a gameboard of size 10x10 [X]
- place ships at specific coordinates by calling ship factory function
- receiveAttach() --> takes pair of coordinates checks if it hits a ship, if it is a hit, send the hit to the correct ship or record missed shot
- keep track of missed attacks to display them
- report whether or not all ships have sunk

#### Gameboard Tests

1. test if a 10x10 grid is created successfully
   for this, when I checked returned grid using toBe() in jest, it suggessted that If I need to check equality of 1 arrays, I use deep equality and use toStrictEqual()

2. place ships on board

for this we call ship factory, to get a ship
then we take the first coordinate from which ship starts on board
then we take direction as well to tell the direction of ship on board (horizontal / vertical)

##### logic for placing ship on gameboard

- take the starting position of ship
- check which direction the ship is to be placed and get all ship coordinates

  - if ship is placed horizontally, get the next coordinates by incrementing the y coord until we reach the ship length
  - if ship is placed vertically, get the next coordinates by incrementing the x coord until we reach the ship length

- if a ship is placed in a way that a portion of it ship gets out of the board, show a message to indicate that it is an invalid move and no such cell exists in the board.

- after we get all the coordinates of a ship, we will make an object like below:

shipOnBoard : {
shipFactory: {
name, size, hit, isSink
},
shipCellsArr: [
[0,0], [0,1]
]
}

then we can use the name of the ship which is unique on 1 board to attack it

--- check if a coordinate is passed that doesnot exist on the board, then show error that this coordinate doesnot exist on the board an so cannot be attacked (or maybe not as while placing a ship we checked that we cannot place a ship on a cell that doesnot exist) (after thinking about this I wouldnt need this as its already checked)

- for all the ship coordinates obtained, check if for any coordinate, another ship or a portion of another ship is present
  - if it is, then we cannot place the ship there
- if ship is placed at a new location, not already occupied by another ship, then place the ship

(added the above logic but kinda hacky in my opinion but it works so imma proceed to the next step, and try to research array traversing methods again to get a better handle on which array method to use here)

- ship should have a reference to its object containing its name, hit, isSink methods to later use them
  (made the object for this)

##### Attack ship logic

- hit a cell on board
- if a ship is present on the hit cell, hit count of ship is incremented
- if ship is not present on the hit cell, attack is registered as a missed attack
- if a ship is hit the same number of times as its size/length, then the ship sinks
- if a cell on board has already been hit once, it cannot be hit again
- if all ships are sunken, report that all ships have sunk

I think with this the gameboard module is covered entirely.
Now moving onto the Player module

#### Player module

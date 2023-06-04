/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Game/Game.js":
/*!**************************!*\
  !*** ./src/Game/Game.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Ship_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Ship/Ship */ \"./src/Ship/Ship.js\");\n/* harmony import */ var _Player_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Player/Player */ \"./src/Player/Player.js\");\n\n\nconst Game = (player1Name, player2Name) => {\n  const player1 = (0,_Player_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(player1Name);\n  const player2 = (0,_Player_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(player2Name);\n  let currentPlayer = player1;\n\n  // change player turn\n  function changePlayerTurn() {\n    if (currentPlayer === player1) {\n      currentPlayer = player2;\n      return currentPlayer;\n    }\n    currentPlayer = player1;\n    return currentPlayer;\n  }\n  function endGame() {\n    if (player1.board.allShipsSunk()) {\n      return `${player2.name} wins!`;\n    }\n    if (player2.board.allShipsSunk()) {\n      return `${player1.name} wins!`;\n    }\n    return false;\n  }\n  function player1Ships() {\n    const player1PatrolBoat = (0,_Ship_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"patrol boat\", 2);\n    const player1StartingPosition = [0, 0];\n    const player1DirectionOnBoard = \"horizontal\";\n    player1.board.placeShip(player1PatrolBoat, player1StartingPosition, player1DirectionOnBoard);\n    const player1Submarine = (0,_Ship_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"submarine\", 3);\n    const player1StartingPositionSubmarine = [5, 0];\n    const player1DirectionOnBoardSubmarine = \"vertical\";\n    player1.board.placeShip(player1Submarine, player1StartingPositionSubmarine, player1DirectionOnBoardSubmarine);\n  }\n  function player2Ships() {\n    const player2PatrolBoat = (0,_Ship_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"patrol boat\", 2);\n    const player2StartingPosition = [2, 0];\n    const player2DirectionOnBoard = \"horizontal\";\n    player2.board.placeShip(player2PatrolBoat, player2StartingPosition, player2DirectionOnBoard);\n    const player2Submarine = (0,_Ship_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"submarine\", 3);\n    const player2StartingPositionSubmarine = [5, 3];\n    const player2DirectionOnBoardSubmarine = \"vertical\";\n    player2.board.placeShip(player2Submarine, player2StartingPositionSubmarine, player2DirectionOnBoardSubmarine);\n  }\n  return {\n    player1,\n    player2,\n    changePlayerTurn,\n    endGame,\n    player1Ships,\n    player2Ships\n  };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack://battleship/./src/Game/Game.js?");

/***/ }),

/***/ "./src/Gameboard/Gameboard.js":
/*!************************************!*\
  !*** ./src/Gameboard/Gameboard.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Ship_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Ship/Ship */ \"./src/Ship/Ship.js\");\n\nconst Gameboard = () => {\n  const shipsOnBoard = [];\n  const recordShotsOnBoard = [];\n  const missedShots = [];\n  const shipCellsOccupied = [];\n  let sinkShips = 0;\n  function grid() {\n    let x = 0;\n    const board = [];\n    // eslint-disable-next-line no-plusplus\n    for (let y = 0; x < 10; y++) {\n      if (y === 10) {\n        y = -1;\n        x += 1;\n      } else {\n        board.push([x, y]);\n      }\n    }\n    return board;\n  }\n  function checkForValidCellInGrid(cell) {\n    const board = grid();\n    let valid = false;\n    board.forEach(boardCell => {\n      if (boardCell[0] === cell[0] && boardCell[1] === cell[1]) {\n        valid = true;\n      }\n    });\n    return valid;\n  }\n  function checkForShipOverlap(cell) {\n    let shipOverlap;\n    shipsOnBoard.forEach(ship => {\n      shipOverlap = ship.shipCellsArr.some(shipCell => {\n        if (shipCell[0] === cell[0] && shipCell[1] === cell[1]) {\n          return true;\n        }\n      });\n    });\n    return shipOverlap;\n  }\n  function getShipCellsOnBoard(shipSize, startCell, direction) {\n    const shipCells = [];\n    let validCell = true;\n    shipCells.push(startCell);\n    if (direction === \"horizontal\") {\n      let endY = startCell[1];\n      for (let y = 0; y < shipSize - 1; y++) {\n        endY += 1;\n        const cell = [startCell[0], endY];\n        shipCells.push(cell);\n        validCell = checkForValidCellInGrid(cell);\n        if (!validCell) {\n          break;\n        }\n      }\n    } else if (direction === \"vertical\") {\n      let endX = startCell[0];\n      for (let x = 0; x < shipSize - 1; x++) {\n        endX += 1;\n        const cell = [endX, startCell[1]];\n        shipCells.push(cell);\n        shipCellsOccupied.push(cell);\n        validCell = checkForValidCellInGrid(cell);\n        if (!validCell) {\n          break;\n        }\n      }\n    }\n    return !validCell ? `[${shipCells[shipCells.length - 1]}] is not a valid move` : shipCells;\n  }\n  function placeShip(ship, startingPosition, directionOnBoard) {\n    let shipCellsArr = \"\";\n\n    // do {\n\n    shipCellsArr = getShipCellsOnBoard(ship.size(), startingPosition, directionOnBoard);\n    // } while (typeof shipCellsArr === \"string\");\n\n    if (shipCellsArr.includes(\"not a valid move\")) {\n      return \"invalid move\";\n    }\n\n    // before placing it on board, check if any of the coordinates overlap with any of the previous ships placed of the board\n    // console.log(shipCellsOccupied);\n    if (shipCellsOccupied.length !== 0) {\n      let inValidCell;\n      for (let i = 0; i < shipCellsArr.length; i++) {\n        const valid = checkForShipOverlap(shipCellsArr[i]);\n        if (valid === true) {\n          inValidCell = shipCellsArr[i];\n          break;\n        }\n      }\n      if (inValidCell) {\n        return `[${inValidCell}] is already occupied by another ship! invalid placement of ship`;\n      }\n    }\n    shipCellsOccupied.push(shipCellsArr);\n    const shipOnBoard = {\n      ship,\n      shipCellsArr\n    };\n    shipsOnBoard.push(shipOnBoard);\n    return shipCellsArr;\n  }\n  function checkCellAttackedTwice(cell) {\n    const duplicateAttack = recordShotsOnBoard.some(recordedCell => recordedCell[0] === cell[0] && recordedCell[1] === cell[1]);\n    return duplicateAttack;\n  }\n  function receiveAttack(cell) {\n    // check if cell is attacked twice\n    if (checkCellAttackedTwice(cell)) {\n      return `cannot hit twice on [${cell}]`;\n    }\n    let attackResult = \"miss\";\n    shipsOnBoard.map(ships => {\n      ships.shipCellsArr.map(shipCell => {\n        if (shipCell[0] === cell[0] && shipCell[1] === cell[1]) {\n          ships.ship.hit();\n          attackResult = \"hit\";\n          recordShotsOnBoard.push(cell);\n          if (ships.ship.isSink()) {\n            attackResult = `${ships.ship.name} has sunk!`;\n            sinkShips++;\n          }\n        }\n      });\n    });\n    if (attackResult === \"miss\") {\n      recordShotsOnBoard.push(cell);\n      missedShots.push(cell);\n    }\n    return attackResult;\n  }\n  function allShipsSunk() {\n    return sinkShips === shipsOnBoard.length;\n  }\n  return {\n    grid,\n    placeShip,\n    receiveAttack,\n    allShipsSunk,\n    recordShotsOnBoard,\n    shipCellsOccupied\n  };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Gameboard);\n\n//# sourceURL=webpack://battleship/./src/Gameboard/Gameboard.js?");

/***/ }),

/***/ "./src/Player/Player.js":
/*!******************************!*\
  !*** ./src/Player/Player.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Ship_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Ship/Ship */ \"./src/Ship/Ship.js\");\n/* harmony import */ var _Gameboard_Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Gameboard/Gameboard */ \"./src/Gameboard/Gameboard.js\");\n\n\nconst Player = playerName => {\n  const name = playerName;\n  const board = (0,_Gameboard_Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\n  // attack enemy board\n  function attackEnemyBoard(enemy, cell) {\n    return enemy.board.receiveAttack(cell);\n  }\n  function randNum() {\n    return Math.floor(Math.random() * 9);\n  }\n  function checkForDuplicateMove(enemy, move) {\n    let currentRandMove = move;\n    while (currentRandMove === move) {\n      // eslint-disable-next-line no-loop-func\n      enemy.board.recordShotsOnBoard.forEach(shotCell => {\n        if (shotCell[0] === move[0] && shotCell[1] === move[1]) {\n          currentRandMove = [randNum(), randNum()];\n        }\n      });\n    }\n    return currentRandMove;\n  }\n  function AIMove(enemy) {\n    const randomCell = [randNum(), randNum()];\n    let newRandomCell = randomCell;\n    if (enemy.board.recordShotsOnBoard.length !== 0) {\n      newRandomCell = checkForDuplicateMove(enemy, randomCell);\n    }\n    let finalMoveOnEnemyBoard = randomCell;\n    if (randomCell[0] !== newRandomCell[0] && randomCell[1] !== newRandomCell[1]) {\n      finalMoveOnEnemyBoard = newRandomCell;\n    }\n    return finalMoveOnEnemyBoard;\n  }\n  function randomPlacementForShips(board) {\n    const shipsArr = getShips();\n    console.log(shipsArr);\n    for (let i = 0; i < shipsArr.length; i++) {\n      let cell = [randNum(), randNum()];\n      const dir = getRandomShipDirection();\n      let placed = board.placeShip(shipsArr[i], cell, dir);\n      while (placed.includes(\"invalid move\") || placed.includes(\"invalid placement\")) {\n        cell = [randNum(), randNum()];\n        placed = board.placeShip(shipsArr[i], cell, dir);\n      }\n    }\n  }\n  function getShips() {\n    const patrolBoat = (0,_Ship_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"patrol boat\", 2);\n    const submarine = (0,_Ship_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"submarine\", 3);\n    const destroyer = (0,_Ship_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"destroyer\", 3);\n    const battleship = (0,_Ship_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"battleship\", 4);\n    const carrier = (0,_Ship_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"carrier\", 5);\n    return [patrolBoat, submarine, destroyer, battleship, carrier];\n  }\n  function getRandomShipDirection() {\n    const direction = [\"vertical\", \"horizontal\"];\n    const choice = Math.random().toFixed(1);\n    // console.log(choice < 0.5 ? direction[0] : direction[1]);\n    return choice < 0.5 ? direction[0] : direction[1];\n  }\n  return {\n    name,\n    board,\n    attackEnemyBoard,\n    AIMove,\n    randomPlacementForShips\n  };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\n\n//# sourceURL=webpack://battleship/./src/Player/Player.js?");

/***/ }),

/***/ "./src/Ship/Ship.js":
/*!**************************!*\
  !*** ./src/Ship/Ship.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\nconst Ship = (name, shipLength) => {\n  let hitCount = 0;\n  function size() {\n    return shipLength;\n  }\n  function setMaxHitCount() {\n    hitCount = size();\n  }\n  function isSink() {\n    return hitCount === size();\n  }\n  function hit() {\n    hitCount += 1;\n    if (hitCount >= size()) {\n      setMaxHitCount();\n      return isSink();\n    }\n    return hitCount;\n  }\n  const ship = {\n    name,\n    size,\n    hit,\n    isSink\n  };\n  return ship;\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ship);\n\n//# sourceURL=webpack://battleship/./src/Ship/Ship.js?");

/***/ }),

/***/ "./src/UI/view.js":
/*!************************!*\
  !*** ./src/UI/view.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style.css */ \"./src/style.css\");\n/* harmony import */ var _Game_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Game/Game */ \"./src/Game/Game.js\");\n\n // modal\n\nconst View = () => {\n  const game = (0,_Game_Game__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\"player1\", \"CPU\");\n  const {\n    player1\n  } = game;\n  const {\n    player2\n  } = game;\n  const enemy = player2;\n  const currentPlayer = player1;\n  function startGame() {\n    showPlayerSide(player1);\n    showPlayerSide(player2);\n    player1.randomPlacementForShips(player1.board);\n    placeShips(player1.name, player1.board.shipCellsOccupied);\n    player2.randomPlacementForShips(player2.board);\n    placeShips(player2.name, player2.board.shipCellsOccupied);\n  }\n  function showPlayerSide(player) {\n    const playerName = player.name;\n    const playerBoard = player.board.grid();\n    makePlayerSideView(playerName, playerBoard);\n  }\n  function placeShips(playerName, shipsLocationArr) {\n    showShipsOnBoard(playerName, shipsLocationArr);\n  }\n  function hitCell(e) {\n    const cellX = parseInt(e.target.getAttribute(\"data-cell-x\"));\n    const cellY = parseInt(e.target.getAttribute(\"data-cell-y\"));\n    const attackResult = player2.board.receiveAttack([cellX, cellY]);\n    console.log(\"player1\", attackResult);\n    if (attackResult === \"miss\") {\n      e.target.classList.add(\"cell-missed\");\n    } else if (attackResult === \"hit\") {\n      e.target.classList.add(\"cell-hit\");\n    } else {\n      e.target.classList.add(\"cell-hit\");\n      console.log(attackResult);\n    }\n    if (game.endGame() === `${player1.name} wins!`) {\n      console.log(`${player1.name} wins!`);\n      return;\n    }\n\n    // currentPlayer = game.changePlayerTurn();\n    // enemy = player1;\n\n    AIMoveOnBoard();\n  }\n  function AIMoveOnBoard() {\n    const player1BoardUI = document.querySelector(\".player1\").querySelectorAll(\".cell\");\n    const move = player2.AIMove(player1);\n    const attackResult = player1.board.receiveAttack(move);\n    player1BoardUI.forEach(cell => {\n      const cellX = parseInt(cell.getAttribute(\"data-cell-x\"));\n      const cellY = parseInt(cell.getAttribute(\"data-cell-y\"));\n      if (move[0] === cellX && move[1] === cellY) {\n        if (attackResult === \"miss\") {\n          cell.classList.add(\"cell-missed\");\n        }\n        if (attackResult === \"hit\") {\n          cell.classList.add(\"cell-hit\");\n        }\n      }\n    });\n\n    // currentPlayer = game.changePlayerTurn();\n    // enemy = player2;\n  }\n\n  function makePlayerSideView(name, board) {\n    const playerContainer = document.createElement(\"div\");\n    const playerName = document.createElement(\"p\");\n    playerName.textContent = name;\n    playerContainer.appendChild(playerName);\n    const grid = document.createElement(\"div\");\n    grid.classList.add(\"gameboard\");\n    grid.classList.add(name);\n    board.forEach(cell => {\n      const singleCell = document.createElement(\"div\");\n      singleCell.classList.add(\"cell\");\n      singleCell.setAttribute(\"data-cell-x\", cell[0]);\n      singleCell.setAttribute(\"data-cell-y\", cell[1]);\n      if (name !== \"player1\") {\n        singleCell.classList.add(\"enemy-cell\");\n        singleCell.addEventListener(\"click\", hitCell, {\n          once: true\n        });\n      }\n      grid.appendChild(singleCell);\n    });\n    playerContainer.appendChild(grid);\n    const container = document.querySelector(\".container\");\n    container.appendChild(playerContainer);\n  }\n  function showShipsOnBoard(playerName, shipsLocationArr) {\n    const playerBoardUI = document.querySelector(`.${playerName}`).querySelectorAll(\".cell\");\n    const shipsArr = shipsLocationArr.flat(1);\n    playerBoardUI.forEach(cell => {\n      const cellX = parseInt(cell.getAttribute(\"data-cell-x\"));\n      const cellY = parseInt(cell.getAttribute(\"data-cell-y\"));\n      shipsArr.forEach(shipCell => {\n        const shipPresence = shipCell[0] === cellX && shipCell[1] === cellY;\n        if (shipPresence) {\n          cell.classList.add(\"cell-ship\");\n        }\n      });\n    });\n  }\n  return {\n    startGame\n  };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (View);\n\n//# sourceURL=webpack://battleship/./src/UI/view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UI_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI/view */ \"./src/UI/view.js\");\n\nconst view = (0,_UI_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\nview.startGame();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"#root {\\r\\n  height: 100vh;\\r\\n}\\r\\n\\r\\n.container {\\r\\n  display: flex;\\r\\n  justify-content: space-between;\\r\\n  max-width: 1000px;\\r\\n  margin: 0 auto;\\r\\n}\\r\\n\\r\\n.cell-row {\\r\\n  height: 40px;\\r\\n}\\r\\n\\r\\n.gameboard {\\r\\n  display: flex;\\r\\n  max-width: 430px;\\r\\n  flex-wrap: wrap;\\r\\n  margin: 0 auto;\\r\\n}\\r\\n\\r\\nbutton {\\r\\n  border: none;\\r\\n  background: transparent;\\r\\n}\\r\\n\\r\\n.cell {\\r\\n  outline: 1px solid #000000;\\r\\n  width: 40px;\\r\\n  height: 40px;\\r\\n  background-color: white;\\r\\n}\\r\\n\\r\\n.cell-ship {\\r\\n  background-color: #c07f1e;\\r\\n}\\r\\n\\r\\n.enemy-cell {\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.enemy-cell:hover {\\r\\n  background-color: lightgreen;\\r\\n}\\r\\n\\r\\n.cell-missed {\\r\\n  background-color: rgb(50, 169, 199);\\r\\n}\\r\\n\\r\\n.cell-hit {\\r\\n  background-color: red;\\r\\n}\\r\\n\\r\\n.cell.cell-hit:hover {\\r\\n  background-color: red;\\r\\n  cursor: auto;\\r\\n}\\r\\n/*\\r\\n.cell-missed {\\r\\n  background-color: lightgray;\\r\\n}\\r\\n\\r\\n.cell.cell-missed:hover,\\r\\n.cell.cell-hit:hover {\\r\\n  cursor: context-menu;\\r\\n  background-color: lightgray;\\r\\n}\\r\\n\\r\\n.cell.cell-hit:hover {\\r\\n  background-color: red;\\r\\n}\\r\\n\\r\\n.text-align-center {\\r\\n  text-align: center;\\r\\n}\\r\\n*/\\r\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleship/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleship/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module) {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ (function(module) {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ (function(module) {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ (function(module) {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ (function(module) {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
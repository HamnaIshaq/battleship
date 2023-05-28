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

/***/ "./src/Game/game.js":
/*!**************************!*\
  !*** ./src/Game/game.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Ship_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Ship/ship */ \"./src/Ship/ship.js\");\n/* harmony import */ var _Player_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Player/player */ \"./src/Player/player.js\");\n\n\nconst Game = (player1Name, player2Name) => {\n  let player1 = (0,_Player_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(player1Name);\n  let player2 = (0,_Player_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(player2Name);\n  placeShips();\n  function changePlayerTurn() {}\n  function placeShips() {\n    player1ShipPlacementTemp();\n    player2ShipPlacementTemp();\n\n    //console.log(player1.shipCoords());\n  }\n\n  function player1ShipPlacementTemp() {\n    const ship1 = (0,_Ship_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(2);\n    const coordShip1Start = [0, 0];\n    const coordShip1End = [0, 1];\n    const ship2 = (0,_Ship_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(3);\n    const coordShip2Start = [2, 0];\n    const coordShip2End = [2, 2];\n    const ship3 = (0,_Ship_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(3);\n    const coordShip3Start = [3, 4];\n    const coordShip3End = [3, 6];\n    player1.gameBoard.placeShip(ship1, coordShip1Start, coordShip1End);\n    player1.gameBoard.placeShip(ship2, coordShip2Start, coordShip2End);\n    player1.gameBoard.placeShip(ship3, coordShip3Start, coordShip3End);\n    return player1.gameBoard;\n  }\n  function player2ShipPlacementTemp() {\n    const ship1 = (0,_Ship_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(2);\n    const coordShip1Start = [0, 5];\n    const coordShip1End = [0, 6];\n    const ship2 = (0,_Ship_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(3);\n    const coordShip2Start = [2, 0];\n    const coordShip2End = [2, 2];\n    player2.gameBoard.placeShip(ship1, coordShip1Start, coordShip1End);\n    player2.gameBoard.placeShip(ship2, coordShip2Start, coordShip2End);\n    return player2.gameBoard;\n  }\n\n  // end game when all ships have sunk\n  function endGame() {\n    if (player1.gameBoard.allShipsHaveSunk() === \"all ships have sunk\") {\n      return `${player2.name} wins!`;\n    } else if (player2.gameBoard.allShipsHaveSunk() === \"all ships have sunk\") {\n      return `${player1.playerName} wins`;\n    }\n  }\n  return {\n    player1,\n    player2,\n    endGame\n  };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack://webpack-template/./src/Game/game.js?");

/***/ }),

/***/ "./src/Gameboard/gameboard.js":
/*!************************************!*\
  !*** ./src/Gameboard/gameboard.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\nconst GameBoard = () => {\n  const gameBoard = createGameBoard();\n  let shipPlacement = [];\n  let recordShots = [];\n  let shipCoordsArr = [];\n  function createGameBoard() {\n    let board = [];\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        board.push([i, j]);\n      }\n    }\n    return board;\n  }\n\n  // place ship on gameboard\n  function placeShip(ship, start, end) {\n    const shipOverLap = checkForShipOverlap(start, end);\n    if (shipOverLap) {\n      return \"ERROR: cannot place ship on top of another ship!\";\n    }\n    const shipPlaced = gameBoard.filter(square => {\n      if (start.toString() === square.toString() || end.toString() === square.toString()) {\n        return square;\n      }\n    });\n    const [startCell, endCell] = shipPlaced;\n    const shipLocation = shipPlacementOnBoard(startCell, endCell);\n    shipCoordsArr.push(shipLocation);\n    shipPlacement.push({\n      ship: ship,\n      coords: shipLocation\n    });\n    return shipPlaced;\n  }\n  // all ship cells from start position to end position\n  function shipPlacementOnBoard(startCell, endCell) {\n    const [startX, startY] = startCell;\n    const [endX, endY] = endCell;\n    let shipCellsArr = [];\n    if (startY !== endY) {\n      for (let y = startY; y <= endY; y++) {\n        shipCellsArr.push([startX, y]);\n      }\n      return shipCellsArr;\n    }\n    for (let x = startX; x <= endX; x++) {\n      shipCellsArr.push([x, startY]);\n    }\n    return shipCellsArr;\n  }\n  function shipCoords() {\n    return shipCoordsArr.flat();\n  }\n  function checkForShipOverlap(start, end) {\n    if (shipCoords()) {\n      const shipCells = shipCoords();\n      const shipOverLap = shipCells.some(cell => {\n        if (cell[0] === start[0] && cell[1] === start[1] || cell[0] === end[0] && cell[1] === end[1]) {\n          return true;\n        }\n      });\n      return shipOverLap;\n    }\n  }\n\n  // receive attack on gameboard\n  function receiveAttack(attackCell) {\n    let attackOnAlreadyHitCoord = checkForAttackOnSameCoordinate(attackCell);\n    if (attackOnAlreadyHitCoord) {\n      return \"cannot attach twice on the same coordinate\";\n    }\n    let attackedSquare;\n    shipPlacement.forEach(shipData => {\n      shipData.coords.forEach(coords => {\n        if (coords[0] === attackCell[0] && coords[1] === attackCell[1]) {\n          recordShots.push(attackCell);\n          shipData.ship.hit();\n          attackedSquare = \"ship was hit!\";\n          if (shipData.ship.isSink()) {\n            attackedSquare = \"ship has sunk!\";\n          }\n        }\n      });\n    });\n    if (!attackedSquare) {\n      attackedSquare = \"missed\";\n      recordShots.push(attackCell);\n    }\n    return attackedSquare;\n  }\n  function checkForAttackOnSameCoordinate(attackCell) {\n    const coordinate = recordShots.some(coordinate => coordinate[0] === attackCell[0] && coordinate[1] === attackCell[1]);\n    return coordinate;\n  }\n  function allShipsHaveSunk() {\n    const totalShips = getTotalShipsOnBoard();\n    let totalSunkShips = 0;\n    shipPlacement.forEach(data => {\n      if (data.ship.isSink()) {\n        totalSunkShips++;\n      }\n    });\n    if (totalSunkShips === totalShips) {\n      return \"all ships have sunk\";\n    }\n  }\n  function getTotalShipsOnBoard() {\n    return shipPlacement.length;\n  }\n  return {\n    placeShip,\n    receiveAttack,\n    allShipsHaveSunk,\n    recordShots,\n    gameBoard,\n    shipCoords\n  };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameBoard);\n\n//# sourceURL=webpack://webpack-template/./src/Gameboard/gameboard.js?");

/***/ }),

/***/ "./src/Player/player.js":
/*!******************************!*\
  !*** ./src/Player/player.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Gameboard_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Gameboard/gameboard */ \"./src/Gameboard/gameboard.js\");\n\nconst Player = name => {\n  let gameBoard = (0,_Gameboard_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  let playerName = name;\n  function makeMoveOnBoard(enemyGameboard, coords) {\n    const move = enemyGameboard.receiveAttack(coords);\n    return move;\n  }\n  function makeRandomMove(enemyGameboard) {\n    let randomMove = [randomNum(), randomNum()];\n    let newRandomMove = checkForDuplicateMove(enemyGameboard, randomMove);\n    let finalMove;\n    if (randomMove[0] !== newRandomMove[0] && randomMove[1] !== newRandomMove[1]) {\n      finalMove = newRandomMove;\n    } else {\n      finalMove = randomMove;\n    }\n    return enemyGameboard.receiveAttack(finalMove);\n  }\n  function checkForDuplicateMove(move) {\n    let inValidMove = true;\n    let currentRandomMove = move;\n    let finalRandomMove;\n    while (inValidMove) {\n      let newMove = [];\n      enemyGameboard.recordShots.forEach(coords => {\n        if (coords[0] === currentRandomMove[0] && coords[1] === currentRandomMove[1]) {\n          newMove = randomMove = [randomNum(), randomNum()];\n        }\n      });\n      if (newMove.length === 0) {\n        inValidMove = false;\n        finalRandomMove = currentRandomMove;\n      }\n      //duplicate move\n      if (newMove.length !== 0) {\n        inValidMove = true;\n        currentRandomMove = newMove;\n      }\n    }\n    return finalRandomMove;\n  }\n  function randomNum() {\n    return Math.floor(Math.random() * 10);\n  }\n  return {\n    makeRandomMove,\n    makeMoveOnBoard,\n    gameBoard,\n    playerName\n  };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\n\n//# sourceURL=webpack://webpack-template/./src/Player/player.js?");

/***/ }),

/***/ "./src/Ship/ship.js":
/*!**************************!*\
  !*** ./src/Ship/ship.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\nconst Ship = length => {\n  let hitCount = 0;\n  function len() {\n    return length;\n  }\n  function hit() {\n    // by default hit is 0, and hit is maximun eq to length of ship\n    hitCount++;\n    if (hitCount > len()) {\n      return \"Ship cannot be hit more than its length\";\n    }\n    return hitCount;\n  }\n  function getCurrentHitCount() {\n    return hitCount;\n  }\n  function isSink() {\n    // get number of hits, get length of ship, compare the 2 if they are equal, ship has sunk, else not sunken\n    const shipLength = len();\n    const hitCounter = getCurrentHitCount();\n    return hitCounter === shipLength ? true : false;\n  }\n  return {\n    len,\n    hit,\n    isSink\n  };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ship);\n\n//# sourceURL=webpack://webpack-template/./src/Ship/ship.js?");

/***/ }),

/***/ "./src/View/view.js":
/*!**************************!*\
  !*** ./src/View/view.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Game/game */ \"./src/Game/game.js\");\n\nconst View = () => {\n  let game = (0,_Game_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"player1\", \"computer\");\n  function createGridForPlayer1() {\n    const board1 = game.player1.gameBoard.gameBoard;\n    const grid = document.createElement(\"div\");\n    grid.classList.add(\"gameboard\");\n    let count = 0;\n    let cellContainer;\n    board1.forEach(arr1 => {\n      if (count === 0) {\n        cellContainer = document.createElement(\"div\");\n        cellContainer.classList.add(\"cell-row\");\n      }\n      if (arr1[1] <= 9 && count !== 9) {\n        count++;\n      } else {\n        count = 0;\n        grid.appendChild(cellContainer);\n      }\n      const cell = document.createElement(\"button\");\n      cell.classList.add(\"cell\");\n      cell.setAttribute(\"data-cell-x\", arr1[0]);\n      cell.setAttribute(\"data-cell-y\", arr1[1]);\n      cell.addEventListener(\"click\", hitCell, {\n        once: true\n      });\n      cellContainer.appendChild(cell);\n      const show = showShipPlacement(arr1[0], arr1[1]);\n      if (show) {\n        cell.classList.add(\"cell-ship\");\n      }\n    });\n    return grid;\n  }\n  function showShipPlacement(x, y) {\n    const ships = game.player1.gameBoard.shipCoords();\n    let show = false;\n    ships.forEach(ship => {\n      if (ship[0] === x && ship[1] === y) {\n        show = true;\n      }\n    });\n    return show;\n  }\n  function createGridForPlayer2() {\n    const board2 = game.player2.gameBoard.gameBoard;\n    const grid = document.createElement(\"div\");\n    grid.classList.add(\"gameboard\");\n    //grid.addEventListener(\"click\", hitCell);\n\n    let count = 0;\n    let cellContainer;\n    board2.forEach(arr1 => {\n      if (count === 0) {\n        cellContainer = document.createElement(\"div\");\n        cellContainer.classList.add(\"cell-row\");\n      }\n      if (arr1[1] <= 9 && count !== 9) {\n        count++;\n      } else {\n        count = 0;\n        grid.appendChild(cellContainer);\n      }\n      const cell = document.createElement(\"button\");\n      cell.classList.add(\"cell\");\n      cell.setAttribute(\"data-cell-x\", arr1[0]);\n      cell.setAttribute(\"data-cell-y\", arr1[1]);\n      cell.addEventListener(\"click\", hitCell, {\n        once: true\n      });\n      cellContainer.appendChild(cell);\n    });\n    return grid;\n  }\n  function player1Side() {\n    const boardPlayer1 = createGridForPlayer1();\n    const nameContainer = document.createElement(\"div\");\n    nameContainer.classList.add(\"text-align-center\");\n    const namePara = document.createElement(\"p\");\n    nameContainer.appendChild(namePara);\n    namePara.textContent = game.player1.playerName;\n    const side = document.createElement(\"div\");\n    side.appendChild(boardPlayer1);\n    side.appendChild(nameContainer);\n    return side;\n  }\n  function player2Side() {\n    const boardPlayer2 = createGridForPlayer2();\n    const nameContainer = document.createElement(\"div\");\n    nameContainer.classList.add(\"text-align-center\");\n    const namePara = document.createElement(\"p\");\n    nameContainer.appendChild(namePara);\n    namePara.textContent = game.player2.playerName;\n    const side = document.createElement(\"div\");\n    side.appendChild(boardPlayer2);\n    side.appendChild(nameContainer);\n    return side;\n  }\n  function hitCell(e) {\n    const x = parseInt(e.target.getAttribute(\"data-cell-x\"));\n    const y = parseInt(e.target.getAttribute(\"data-cell-y\"));\n    const enemyBoard = game.player2.gameBoard;\n    const attackCell = [x, y];\n    const attackStatus = enemyBoard.receiveAttack(attackCell);\n    if (attackStatus === \"missed\") {\n      e.target.classList.add(\"cell-missed\");\n    } else if (attackStatus === \"ship was hit!\") {\n      e.target.classList.add(\"cell-hit\");\n    } else if (attackStatus === \"ship has sunk!\") {\n      e.target.classList.add(\"cell-hit\");\n      console.log(\"ship has sunk\");\n    }\n    if (enemyBoard.allShipsHaveSunk() === \"all ships have sunk\") {\n      console.log(\"player 1 wins\");\n    }\n  }\n  function gameView() {\n    const parent = document.createElement(\"div\");\n    parent.classList.add(\"container\");\n    parent.appendChild(player1Side());\n    parent.appendChild(player2Side());\n    return parent;\n  }\n  return {\n    gameView\n  };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (View);\n\n//# sourceURL=webpack://webpack-template/./src/View/view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _View_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View/view */ \"./src/View/view.js\");\n\n\nconst root = document.querySelector(\"#root\");\nroot.appendChild((0,_View_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"])().gameView());\n\n//# sourceURL=webpack://webpack-template/./src/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"#root {\\r\\n  height: 100vh;\\r\\n}\\r\\n\\r\\n.container {\\r\\n  display: flex;\\r\\n  justify-content: space-between;\\r\\n  max-width: 1000px;\\r\\n  margin: 0 auto;\\r\\n}\\r\\n\\r\\n.cell-row {\\r\\n  height: 40px;\\r\\n}\\r\\n\\r\\n.gameboard {\\r\\n  display: flex;\\r\\n  max-width: 400px;\\r\\n  flex-wrap: wrap;\\r\\n  margin: 0 auto;\\r\\n}\\r\\n\\r\\nbutton {\\r\\n  border: none;\\r\\n  background: transparent;\\r\\n}\\r\\n\\r\\n.cell {\\r\\n  outline: 1px solid #000000;\\r\\n  width: 40px;\\r\\n  height: 40px;\\r\\n  cursor: pointer;\\r\\n  background-color: white;\\r\\n}\\r\\n\\r\\n.cell-ship {\\r\\n  background-color: lightblue;\\r\\n}\\r\\n\\r\\n.cell:hover {\\r\\n  background-color: lightgreen;\\r\\n}\\r\\n\\r\\n.cell-hit {\\r\\n  background-color: red;\\r\\n}\\r\\n\\r\\n.cell-missed {\\r\\n  background-color: lightgray;\\r\\n}\\r\\n\\r\\n.cell.cell-missed:hover,\\r\\n.cell.cell-hit:hover {\\r\\n  cursor: context-menu;\\r\\n  background-color: lightgray;\\r\\n}\\r\\n\\r\\n.cell.cell-hit:hover {\\r\\n  background-color: red;\\r\\n}\\r\\n\\r\\n.text-align-center {\\r\\n  text-align: center;\\r\\n}\\r\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://webpack-template/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://webpack-template/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://webpack-template/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://webpack-template/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module) {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://webpack-template/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ (function(module) {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://webpack-template/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ (function(module) {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://webpack-template/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://webpack-template/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ (function(module) {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://webpack-template/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ (function(module) {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://webpack-template/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

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
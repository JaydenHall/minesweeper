document.addEventListener("DOMContentLoaded", startGame);
let bang;
// Define your `board` object here!
var board = {
  cells: [
    { row: 0, col: 0 },
    { row: 1, col: 0 },
    { row: 2, col: 0 },
    { row: 3, col: 0 },
    { row: 0, col: 1 },
    { row: 1, col: 1 },
    { row: 2, col: 1 },
    { row: 3, col: 1 },
    { row: 0, col: 2 },
    { row: 1, col: 2 },
    { row: 2, col: 2 },
    { row: 3, col: 2 },
    { row: 0, col: 3 },
    { row: 1, col: 3 },
    { row: 2, col: 3 },
    { row: 3, col: 3 },
  ],
};

function createCell() {
  let count = 0
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      board.cells[count].row = i;
      board.cells[count].col = j;
      count++;
    }
  }
}

function setMine() {
  for (i = 0; i < board.cells.length; i++) {
    j = Math.random();
    if (j < 0.25) {
      board.cells[i].isMine = true;
    } else {
      board.cells[i].isMine = false;
    }
  }
}

function isHidden() {
  for (i = 0; i < board.cells.length; i++) {
    board.cells[i].hidden = true;
  }
}

function startGame() {
  // createCell()
  setMine();
  isHidden();
  for (i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
    // console.log(board.cells)
  }
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
  // Don't remove this function call: it makes the game work!
  lib.initBoard();
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
  for (i = 0; i < board.cells.length; i++) {
    if (!board.cells[i].isMarked && board.cells[i].isMine) {
      console.log("check 1");
      console.log(board.cells[i]);
      return;
    } else if (board.cells[i].hidden && !board.cells[i].isMine) {
      console.log("check 2");
      console.log(board.cells[i]);
      return;
    }
  }
  console.log("winner");
  displayMessage("You win!");
}
// You can use this function call to declare a winner (once you've
// detected that they've won, that is!)
//   lib.displayMessage('You win!')

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
// var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.

function countSurroundingMines(cell) {
  let count = 0;
  surroundingCells = getSurroundingCells(cell.row, cell.col);

  // for (let i = 0; i < surroundingCells.length; i++) {
  //   if (surroundingCells[i].isMine == true) {
  //     count++;
  //     console.log('mine')
  //   }
  //   return count;
  // }

  let i = 0;
  while (i < surroundingCells.length) {
    if (surroundingCells[i].isMine == true) {
      count++;
      // console.log('mine');
    }
    i++;
  }
  return count;
}
function bangNoice() {
  let audio = new Audio("audio/Bang.mp3");
  audio.play();
}

const button = document.getElementById("resetButton");
button.addEventListener("click", startGame);

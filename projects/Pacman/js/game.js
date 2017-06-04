'use strict';


// TODOS
// When all foods are collected - game done
// cherry - intervalCherry (sets a timeout to reemove the cherry)
// Bonus: next level


var WALL    = '#';
var FOOD    = '.';
var EMPTY   = ' ';

var gBoard;


var gState = {
  score: 0,
  isGameDone : false
};


function init() {
  handleUserPref();
  
  gBoard = buildBoard();  
  
  
  printMat(gBoard, '.boardContainer');
  
  console.table(gBoard);
  
}



function buildBoard() {
  var SIZE = 15;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      
        board[i][j] = FOOD;
      
      
        if (i === 0 || i === SIZE-1 ||
            j === 0 || j === SIZE-1 ||
            (j == 3 && i > 4 && i < SIZE-2)  )  {
              
          board[i][j] = WALL;
              
        }
    } 
  }
  createPacman(board);
  createGhosts(board);
  
   

  return board;
}




function checkEngage(cell, opponent) {  
  var isGameOver = false;
  if (cell === opponent) {
    if (gPacman.isSuper) {
      console.log('Ghost is dead');
    } else {
      clearInterval(gIntervalGhosts);
      gState.isGameDone  = true;
      alert('Game Over!');
      isGameOver = true;
    }
  }
  return isGameOver;
}




// this function updates both the model and the dom for the score
function updateScore(value) {
    gState.score += value;
    document.querySelector('header > h3 > span').innerText = gState.score;
}

function renderCell(location, value) {
  var cellSelector = '.cell' + location.i + '-' + location.j;
  var elCell = document.querySelector(cellSelector);
  elCell.innerHTML = value;
}





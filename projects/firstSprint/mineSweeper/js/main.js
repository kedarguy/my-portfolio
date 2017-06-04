'use-strict';

var gLevel;
var gBoard;
var gMineElements;
var gState;
var gMine = 'X'

function initGame() {
    gState = {
        isGameOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    };
    var difficulty = prompt('difficulty? enter hard, medium or easy(default)');
    buildBoard(difficulty);
    console.log(gLevel);
    console.table(gBoard);
    renderBoard(gBoard, '.board');
    gTimerDiv.innerHTML = 'Game time is: ' + gState.secsPassed + ' seconds';
    timer();


}

function buildBoard(level) {
    if (level === 'hard') {
        gLevel = {
            size: 8,
            mines: 15
        };
    } else if (level === 'medium') {
        gLevel = {
            size: 6,
            mines: 5
        };

    } else {
        gLevel = {
            size: 4,
            mines: 2
        };

    }
    gBoard = [];
    var mineLocations = randMinesLocation(gLevel);
    console.log('mineLocations:');
    console.log(mineLocations);
    for (var i = 0; i < gLevel.size; i++) {
        gBoard.push([]);
        for (var j = 0; j < gLevel.size; j++) {
            gBoard[i][j] = {
                idx: i,
                jdx: j,
                isMine: false
            };
            for (var k = 0; k < mineLocations.length; k++) {
                if (mineLocations[k][0] === i && mineLocations[k][1] === j) gBoard[i][j].isMine = true;
            }
        }
    }
    setMinesNegsCount(gBoard);

}

function randMinesLocation(levelObj) {
    var matSize = levelObj.size * levelObj.size;
    var mineLocations = [];
    while (mineLocations.length < levelObj.mines) {
        var currMineLocation = [parseInt(Math.random() * levelObj.size), parseInt(Math.random() * levelObj.size)];
        var noDuplicate = true;
        for (var i = 0; i < mineLocations.length; i++) {
            if (currMineLocation[0] === mineLocations[i][0] && currMineLocation[1] === mineLocations[i][1]) {
                noDuplicate = false;
            }
        }
        if (noDuplicate) mineLocations.push(currMineLocation);
    }
    return mineLocations;
}

function setMinesNegsCount(board) {
    board.forEach(function (row, idx) {
        row.forEach(function (cell, jdx) {
            if (!cell.isMine) {
                board[idx][jdx].mineNegs = countNegs(board, idx, jdx);
            }

        });
    });
}

function countNegs(board, cellI, cellJ) {
    var negsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {

            if (i === cellI && j === cellJ) continue;
            if (i < 0 || i >= board.length) continue;
            if (j < 0 || j >= board[0].length) continue;

            var cell = board[i][j];
            if (cell.isMine) {
                negsCount++;
            }

        }
    }
    return negsCount;
}

function renderBoard(board, selectorTable) {
    var strHtml = '';
    board.forEach(function (row, idx) {

        strHtml += '<tr>\n';
        row.forEach(function (cell, jdx) {
            if (board[idx][jdx].isMine) {
                strHtml +=
                    '\t<td class="mine notClicked cell-' + cell.idx + '-' + cell.jdx + ' " onclick="cellClicked(this,' + idx + ',' + jdx + ')" oncontextmenu="rightClicked(this,' + idx + ',' + jdx + '); return false;">';

            } else {
                strHtml +=
                    '\t<td class="notClicked cell-' + cell.idx + '-' + cell.jdx + '" onclick="cellClicked(this,' + idx + ',' + jdx + ')" oncontextmenu="rightClicked(this,' + idx + ',' + jdx + '); return false;">';
            }

            if (cell.isMine) strHtml += '<img src="img/mine.jpg" alt="mine">';
            else {
                switch (cell.mineNegs) {
                    case 1:
                        strHtml += '<img src="img/1.png" alt="1">'
                        break;
                    case 2:
                        strHtml += '<img src="img/2.png" alt="2">'
                        break;
                    case 3:
                        strHtml += '<img src="img/3.png" alt="3">'
                        break;
                    case 4:
                        strHtml += '<img src="img/4.png" alt="4">'
                        break;
                    case 5:
                        strHtml += '<img src="img/5.png" alt="5">'
                        break;
                    case 6:
                        strHtml += '<img src="img/6.png" alt="6">'
                        break;
                }
            }

            strHtml += '</td>\n';
        });
        strHtml += '</tr>\n';
    });
    var elTable = document.querySelector(selectorTable);
    elTable.innerHTML = strHtml;
    gMineElements = document.querySelectorAll('.mine');
}

function cellClicked(elCell, idx, jdx) {
    if (!hasClass(elCell, 'marked')) {
        if (gBoard[idx][jdx].isMine) {
            elCell.style.background = 'red';
            gState.isGameOn = false;

        } else {

            if (hasClass(elCell, 'notClicked')) {
                gState.shownCount++
                elCell.classList.remove('notClicked');
            }
            if (gBoard[idx][jdx].mineNegs === 0) {
                expandShown(gBoard, idx, jdx);
            }

        }
    }
    checkGameOver(gState);
}

function rightClicked(elCell, idx, jdx) {
    if (hasClass(elCell, 'marked')) {
        gState.markedCount--
        elCell.classList.remove('marked');
    } else {
        gState.markedCount++
        elCell.classList.add('marked');

    }
    checkGameOver(gState);
}

function checkGameOver(gameState) {
    if (gState.shownCount === ((gLevel.size * gLevel.size) - gLevel.mines) && gState.markedCount === gLevel.mines) {
        setTimeout(function () { alert('you won!') }, 1000);
        gameState.isGameOn = false;
        clearTimeout(gTimerTimout);
    } else {
        if (!gameState.isGameOn) {
            gMineElements.forEach(function (cell) {
                cell.classList.remove('notClicked');
            });
            setTimeout(function () { alert('Game Over'); });
            clearTimeout(gTimerTimout);

        }

    }
    return gameState.isGameOn
}

var gNegsWithZeroMineNegs = [];
function expandShown(board, cellI, cellJ) {
    gNegsWithZeroMineNegs = [];
    function expandShownRound(board, cellI, cellJ) {
        for (var i = cellI - 1; i <= cellI + 1; i++) {
            for (var j = cellJ - 1; j <= cellJ + 1; j++) {

                if (i === cellI && j === cellJ) continue;
                if (i < 0 || i >= board.length) continue;
                if (j < 0 || j >= board[0].length) continue;

                var cell = board[i][j];
                if (cell.mineNegs === 0) {
                    gNegsWithZeroMineNegs.push(cell);
                }

                elCell = document.querySelector('.cell-' + cell.idx + '-' + cell.jdx + '');
                if (hasClass(elCell, 'notClicked')) {
                    gState.shownCount++
                    elCell.classList.remove('notClicked');

                }
            }
        }
    }

    expandShownRound(board, cellI, cellJ);
    gNegsWithZeroMineNegs.forEach(function (cell) {
        expandShownRound(board, cell.idx, cell.jdx);
    });
}

function restartGame() {
    initGame();
}

var gTimerTimout;
var gTimerDiv = document.querySelector('.timer');

function add() {

    gState.secsPassed++;

    gTimerDiv.innerHTML = 'Game time is: ' + gState.secsPassed + ' seconds';

    timer();
}

function timer() {
    gTimerTimout = setTimeout(add, 1000);
}




'use-strict';

var gBoard;
var gGamerPos;
var gBoxesPos;
var gStepCount;
var gClickEnabled = true;

function initGame() {
    gGamerPos = {
        idx: 1,
        jdx: 3
    };
    gBoxesPos = [
        {
            idx: 5,
            jdx: 6
        },
        {
            idx: 2,
            jdx: 3
        },
        {
            idx: 7,
            jdx: 2
        }];
    gStepCount = 0;
    renderPanel();
    buildBoard();
    console.table(gBoard);
    renderBoard(gBoard, '.board')
    printCurrPlayerPos(gGamerPos);
    gBoxesPos.forEach(function (box) {
        printCurrBoxPos(box);
    });

}

function buildBoard() {
    gBoard = [];
    for (var i = 0; i < 10; i++) {
        gBoard[i] = [];
        for (var j = 0; j < 10; j++) {
            if (i === 0 || i === 9 || j === 0 || j === 9 || (i === 3 && j > 1 && j < 8)) {
                gBoard[i][j] = {
                    idx: i,
                    jdx: j,
                    tileType: 'wall'
                };

            } else if ((i === 4 && j === 4) || (i === 5 && j === 5) || (i === 8 && j === 8)) {

                gBoard[i][j] = {
                    idx: i,
                    jdx: j,
                    tileType: 'target'
                };
            } else if (i === 5 && j === 7) {

                gBoard[i][j] = {
                    idx: i,
                    jdx: j,
                    tileType: 'glue'
                };
            } else if (i === 6 && j === 2) {

                gBoard[i][j] = {
                    idx: i,
                    jdx: j,
                    tileType: 'water'
                };
            } else {
                gBoard[i][j] = {
                    idx: i,
                    jdx: j,
                    tileType: 'floor'
                };

            }
        }
    }
}

function renderBoard(board, selectorTable) {
    var strHtml = '';
    board.forEach(function (row, idx) {

        strHtml += '<tr>\n';
        row.forEach(function (cell, jdx) {
            strHtml += '\t<td class="' + cell.tileType + ' cell-' + cell.idx + '-' + cell.jdx + '" onclick="cellClicked(this,' + idx + ',' + jdx + ')">';
            strHtml += '</td>\n';
        });
        strHtml += '</tr>\n';
    });
    var elTable = document.querySelector(selectorTable);
    elTable.innerHTML = strHtml;
}

function renderPanel() {
    var elPanel = document.querySelector('.panel');
    elPanel.innerHTML = '<div class="count"> moves: ' + gStepCount + '</div>';
}

function cellClicked(elCell, clickedIdx, clickedJdx) {
    if (!gClickEnabled) return
    var newGamerPos = {};
    var direction = '';
    // check new position player wanted to move to and direction
    if (clickedIdx === gGamerPos.idx) {
        newGamerPos.idx = gGamerPos.idx;
        if (clickedJdx > gGamerPos.jdx) {
            newGamerPos.jdx = gGamerPos.jdx + 1;
            direction = 'right';
        } else if (clickedJdx < gGamerPos.jdx) {
            newGamerPos.jdx = gGamerPos.jdx - 1;
            direction = 'left';
        } else {
            newGamerPos.jdx = gGamerPos.jdx;
        }
    } else if (clickedJdx === gGamerPos.jdx) {
        newGamerPos.jdx = gGamerPos.jdx;
        if (clickedIdx > gGamerPos.idx) {
            newGamerPos.idx = gGamerPos.idx + 1;
            direction = 'down';
        } else if (clickedIdx < gGamerPos.idx) {
            newGamerPos.idx = gGamerPos.idx - 1;
            direction = 'up'
        } else {
            newGamerPos.idx = gGamerPos.idx;

        }
    }

    //check if new pos is legal (not wall or double box)
    moveItems(newGamerPos, direction);
    checkGameOver();

}


function moveItems(newGamerPos, direction) {
    var glued = false;
    var checkI = newGamerPos.idx;
    var checkJ = newGamerPos.jdx;
    var elCellToCheck = document.querySelector('.cell-' + checkI + '-' + checkJ);
    if (hasClass(elCellToCheck, 'glue')) {
        console.log('Glued');
        glued = true;
    }
    if (hasClass(elCellToCheck, 'wall')) {
        console.log('hit wall');
    } else {
        checkIfHitBoxAndMoveItems(direction, newGamerPos, glued, checkI, checkJ);
    }
}

function checkIfHitBoxAndMoveItems(direction, newGamerPos, glued , checkI, checkJ) {
    var firstBoxHit;
    var firstBoxHitIdx;
    
    gBoxesPos.forEach(function (box, boxIdx) {
        if (box.idx === checkI && box.jdx === checkJ) {
            firstBoxHit = box;
            firstBoxHitIdx = boxIdx;
        }
    });
    if (firstBoxHit) {
        var newBoxPos = {
            idx: firstBoxHit.idx,
            jdx: firstBoxHit.jdx
        };
        switch (direction) {
            case 'up':
                newBoxPos.idx -= 1
                break;
            case 'down':
                newBoxPos.idx += 1
                break;
            case 'left':
                newBoxPos.jdx -= 1
                break;
            case 'right':
                newBoxPos.jdx += 1
                break;
        }
        newBoxPos = checkIfHitWaterAndReturnUpdatedNewBoxPos(newBoxPos, direction);

        moveBoxAndGamer(newBoxPos, newGamerPos, firstBoxHit, firstBoxHitIdx, glued);
    } else {
        updateGamerPosAndCount(newGamerPos, glued);
    }
}


function checkIfHitWaterAndReturnUpdatedNewBoxPos(newBoxPos, direction, ) {
    if (newBoxPos.idx === 6 && newBoxPos.jdx === 2) {
        var stopped = false;
        // newBoxPesBeforeLastSwitch created in order to reverse once step after hitting a wall
        var newBoxPosBeforeLastSwitch = {
            idx: newBoxPos.idx,
            jdx: newBoxPos.jdx
        };
        while (!stopped) {
            var elCellToCheckBox = document.querySelector('.cell-' + newBoxPos.idx + '-' + newBoxPos.jdx);
            if (hasClass(elCellToCheckBox, 'wall')) {
                console.log('hit wall');
                stopped = true;
            } else {
                var hitAnotherBox = false;
                // enter if box hit another box
                gBoxesPos.forEach(function (box) {
                    if (box.idx === newBoxPos.idx && box.jdx === newBoxPos.jdx) {
                        hitAnotherBox = true;
                    }
                });
                if (hitAnotherBox) {
                    console.log('hit another box');
                    stopped = true;
                } else {

                    switch (direction) {
                        case 'up':
                            newBoxPosBeforeLastSwitch.idx = newBoxPos.idx
                            newBoxPos.idx -= 1
                            break;
                        case 'down':
                            newBoxPosBeforeLastSwitch.idx = newBoxPos.idx
                            newBoxPos.idx += 1
                            break;
                        case 'left':
                            newBoxPosBeforeLastSwitch.jdx = newBoxPos.jdx
                            newBoxPos.jdx -= 1
                            break;
                        case 'right':
                            newBoxPosBeforeLastSwitch.jdx = newBoxPos.jdx
                            newBoxPos.jdx += 1
                            break;
                    }
                }
            }
        }
        newBoxPos = newBoxPosBeforeLastSwitch;
    }
    return newBoxPos
}

function moveBoxAndGamer(newBoxPos, newGamerPos, firstBoxHit, firstBoxHitIdx, glued) {

    var elCellToCheckBox = document.querySelector('.cell-' + newBoxPos.idx + '-' + newBoxPos.jdx);
    if (hasClass(elCellToCheckBox, 'wall')) {
        console.log('hit wall');
    } else {
        var hitAnotherBox = false;
        // enter if box hit another box
        gBoxesPos.forEach(function (box) {
            if (box.idx === newBoxPos.idx && box.jdx === newBoxPos.jdx) {
                hitAnotherBox = true;
            }
        });
        if (hitAnotherBox) {
            console.log('hit another box');
        } else {
            erasePrevBoxPos(firstBoxHit);
            printCurrBoxPos(newBoxPos);
            gBoxesPos[firstBoxHitIdx] = newBoxPos;
            updateGamerPosAndCount(newGamerPos, glued);
        }

    }
}
function updateGamerPosAndCount(newGamerPos, isGlued) {
    if (isGlued) {
        setTimeout(function () { alert('youre glued!'); });

        gClickEnabled = false;
        setTimeout(function () {
            gStepCount += 5;
            gClickEnabled = true;
        }, 2000);
    }
    erasePrevPlayerPos(gGamerPos);
    printCurrPlayerPos(newGamerPos);
    gGamerPos = newGamerPos;
    gStepCount++
    renderPanel();

}
function printCurrPlayerPos(player) {
    var iPos = player.idx;
    var jPos = player.jdx;
    var elCurrPosCell = document.querySelector('.cell-' + iPos + '-' + jPos);
    elCurrPosCell.innerHTML = '<img src="images/player.png" alt="player">';
}

function erasePrevPlayerPos(player) {
    var iPos = player.idx;
    var jPos = player.jdx;
    var elCurrPosCell = document.querySelector('.cell-' + iPos + '-' + jPos);
    elCurrPosCell.innerHTML = '';
}

function printCurrBoxPos(box) {
    var iPos = box.idx;
    var jPos = box.jdx;
    var elCurrPosCell = document.querySelector('.cell-' + iPos + '-' + jPos);
    elCurrPosCell.innerHTML = '<img src="images/box.png" alt="player">';
}
function erasePrevBoxPos(box) {
    var iPos = box.idx;
    var jPos = box.jdx;
    var elCurrPosCell = document.querySelector('.cell-' + iPos + '-' + jPos);
    elCurrPosCell.innerHTML = 'box';
}

function checkGameOver() {
    var isGameOver = true;
    gBoxesPos.forEach(function (box) {
        var elCell = document.querySelector('.cell-' + box.idx + '-' + box.jdx);
        if (!hasClass(elCell, 'target')) {
            isGameOver = false;
        }
    });
    if (isGameOver) {
        setTimeout(function () {
            alert('You Win!!! youre score is: ' + (100 - gStepCount));
        }), 500;
    }
}

function resetGame() {
    initGame();
}

'use strict';

console.log('sd');
var gState;

var gBoard;

var gInterval;

var gElPanel = document.querySelector('.panel');


function startGame(i_level) {
    clearInterval(gInterval);
    gState = {
        level: i_level,
        nextNum: 1,
        secsPassed: 0,
        tensSecsPassed: 0
    };
    document.querySelector('.nextNum').innerHTML = gState.nextNum;
    gBoard = buildBoard();

    var elBoard = document.querySelector('.board');
    elBoard.classList.remove('large');
    elBoard.classList.remove('medium');
    elBoard.classList.remove('small');
    if (i_level === 3)  elBoard.classList.add('large') 
    if (i_level === 2)  elBoard.classList.add('medium') 
    if (i_level === 1)  elBoard.classList.add('small') 
   
   setTimeout(function () {
        elBoard.innerHTML = `<img src="img/3.png" alt="3">`
    }, );
    setTimeout(function () {
        elBoard.innerHTML = `<img src="img/2.png" alt="2">`
    }, 1000);
    setTimeout(function () {
        elBoard.innerHTML = `<img src="img/1.png" alt="1">`
    }, 2000);
   setTimeout(function () {
        gBoard = buildBoard();
        renderBoard();
        runStopWatch();
    }, 3000);

}

function buildBoard() {
    var boardMat = [];
    var randArr = randArrBuilder();
    var sideSize = getBoardSize();
    var currArrIdx = 0;
    for (var i = 0; i < sideSize; i++) {
        var row = [];
        for (var j = 0; j < sideSize; j++) {
            row.push({ num: randArr[currArrIdx], flipped: false });
            currArrIdx++
        }
        boardMat.push(row);
    }
    return boardMat
}

function getBoardSize() {
    var matSideSize;
    switch (gState.level) {
        case 1:
            matSideSize = 3
            break;
        case 2:
            matSideSize = 4
            break;
        case 3:
            matSideSize = 5
            break;

        default:
            matSideSize = 3
            break;
    }
    return matSideSize
}

function randArrBuilder() {
    var randArr = [];
    var randArrLength = Math.pow(getBoardSize(), 2);

    while (randArr.length < randArrLength) {
        var randNum = Math.ceil(Math.random() * randArrLength);
        var doesNumExist = randArr.some(function (num) {
            return num === randNum
        });
        if (!doesNumExist) randArr.push(randNum);
    }
    return randArr
}

function renderBoard() {
    var htmlStr = '';
    gBoard.forEach(function (row, idx) {
        htmlStr += '<div class="rowInBoard">';
        row.forEach(function (cell, jdx) {
            htmlStr += `<div class="cell cell-${idx}-${jdx}" onclick="clickedCell(${idx},${jdx})">${gBoard[idx][jdx].num}</div>`
        });
        htmlStr += '</div>'
    }, );
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = htmlStr;
}

function clickedCell(i_idx, i_jdx) {
    if (gBoard[i_idx][i_jdx].num === gState.nextNum) {
        gBoard[i_idx][i_jdx].flipped = true;
        document.querySelector(`.cell-${i_idx}-${i_jdx}`).classList.add('flipped');
        gState.nextNum++
        document.querySelector('.nextNum').innerHTML = gState.nextNum;
        if (gState.nextNum === Math.pow(gBoard.length, 2) + 1) {
            setTimeout(function () {
                alert('game won');
            },100);
            clearInterval(gInterval);
        }
    }
}


function addMiliSecToStopWatch() {
    gState.tensSecsPassed++;
    var secsPassedDisp = parseInt((gState.tensSecsPassed/100));
    var tensDisp = gState.tensSecsPassed - secsPassedDisp * 100;
    if (secsPassedDisp < 9) secsPassedDisp = '0' + secsPassedDisp;
    if (tensDisp < 9)  tensDisp = '0' + tensDisp; 
    gElPanel.innerHTML = 'Game time is: ' +secsPassedDisp +':' + tensDisp;
}



function runStopWatch() {
    gInterval = setInterval(addMiliSecToStopWatch, 10);
}



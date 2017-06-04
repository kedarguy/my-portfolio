'use strict';
var gCurrNum = '';
var gAccumelator;
var gElPanel = document.querySelector('.panel');
var gOperator;

function addDigit(digit) {
    gCurrNum += digit;
    gElPanel.innerHTML = gCurrNum;

    displayTests();

}

function setOperator(operator) {
    if (operator === '1/x' || operator === 'sqrt' || operator === '+/-') {
        gOperator = operator;
        calcResult(gOperator);
        gElPanel.innerHTML = gAccumelator;
        gOperator = undefined;
    } else {
        if (gAccumelator) calcResult(gOperator);
        else gAccumelator = +gCurrNum;

        gOperator = operator;
        gElPanel.innerHTML = gAccumelator + ' ' + operator;
    }

    gCurrNum = '';
    displayTests();
}

function finalCalcResult() {
    calcResult(gOperator);
    gElPanel.innerHTML = gAccumelator;
    gOperator = undefined;
    gCurrNum = gAccumelator;
    displayTests();
}

function calcRestart() {
    gCurrNum = '';
    gAccumelator = undefined;
    gOperator = undefined;
    gElPanel.innerHTML = null;

    displayTests();
}
function calcResetPanel() {
    gCurrNum = '';
    gElPanel.innerHTML = null;

    displayTests();
}
function calcDeleteLastChar() {
    gCurrNum = gCurrNum.slice(0, -1);
    gElPanel.innerHTML = gCurrNum;

    displayTests();
}

function calcResult(operator) {
    switch (gOperator) {
        case '+':
            gAccumelator += +gCurrNum;
            break;
        case '-':
            gAccumelator -= +gCurrNum;
            break;
        case '*':
            gAccumelator *= +gCurrNum;
            break;
        case '/':
            gAccumelator /= +gCurrNum;
            break;
        case '1/x':
            gAccumelator = 1 / +gCurrNum;
            break;
        case 'sqrt':
            gAccumelator = Math.sqrt(+gCurrNum);
            break;
        case '+/-':
            gAccumelator = -(+gCurrNum);
            gCurrNum = gAccumelator;
            gCurrNum = gCurrNum.toString();
            break;
    }
    displayTests();
}

function displayTests() {
    document.querySelector('.gCurrNumDisp').innerHTML = 'gCurrNum: ' + gCurrNum;
    document.querySelector('.gAccumeltorDisp').innerHTML = 'gAccumelator: ' + gAccumelator;
    // document.querySelector('.gOperatorDisp').innerHTML = gOperator;

}




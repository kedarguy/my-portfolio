'use strict';

var gElmain;
var gIsCurrDisplayTable;

function initAdmin() {
    gElmain = document.querySelector('.main');
    displayUserCards();

}

function displayUsersInTable() {
    gIsCurrDisplayTable = true;
     gElmain.innerHTML = '';
    var userList = getUsers();
    var htmlStrUserNames = '<tr><td>UserName:</td>';
    var htmlStrlastLoginTime = '<tr><td>Last Login Time: </td>';
    userList.forEach(function (user) {
        htmlStrUserNames += `<td>${user.username}</td>`;
        var userLoginTime = new Date(user.lastLoginTime);
        htmlStrlastLoginTime += `<td>${userLoginTime}</td>`;
    });
    htmlStrUserNames += '</td></tr>'
    htmlStrlastLoginTime += '</td></tr>'
    gElmain.innerHTML += '<table>' + htmlStrUserNames + htmlStrlastLoginTime + '</table>';
}

function displayUserCards() {
    gIsCurrDisplayTable = false;    
    gElmain.innerHTML = '';
    var userList = getUsers();
    userList.forEach(function (user){
        var userLoginTime = new Date(user.lastLoginTime);
        gElmain.innerHTML += `<div class="card">User Name: ${user.username} <br> Last Login Time: ${userLoginTime}</div>`;
    });
    gElmain.innerHTML+= '<div class="clearfix"></div>'

}
function toggleTableDisp() {
    if (gIsCurrDisplayTable)   displayUserCards();
    else                       displayUsersInTable();


}
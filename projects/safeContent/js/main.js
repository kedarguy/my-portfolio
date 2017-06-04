'use-strict';
// Safe Content
// Your challenge is to show some secret content, (i.e. a secret photo) only to users that will be able
//  to login using user and password.
// 1. You will have a users array with user objects
// 2. User object will contain: username, password and lastLoginTime (timestamp)
// 3. Create gUsers with 3 users,
// 4. Write a function saveUsers(users), that saves the users to localStorage using JSON.stringify()
// a. Call it to save the gUsers
// b. Then remove the Hard Coded users from the code (comment it out)
// 5. Write a function getUsers() that loads the users from the localStorage and uses JSON.parse()
// 6. When page loads prompt for user and password
// 7. Write a function that gets username and password and find such a user exist, the function should 
// return the user object if found or null if not (use filter)
// a. This function uses to getUsers() function
// 8. If the user successfully log in, update his lastLoginDate and show him the secret content
// a. Use the saveUsers function to save the updated users array

// 9. Add a button: logout, when clicked ask again for user and password…
// 10. If the user is also an admin (add this property to your model)
// a. show him a link to admin.html
// b. save an indication: userIsAdmin in localStorage
// i. hint: note that localstorage only saves strings, booleans are not supported
// 11. In admin.html show the list of the users inside an HTML table
// 12. Use the localStorage to protect the admin page
// a. if not admin redirect to index page using window.location
// 13. Bonus:
// a. Also build the UI for cards presentation (floating divs, side by side)
// b. Allow the user to switch between the two presentation modes

// var gUsers = [
//     { username: 'a', password: 123, lastLoginTime: null, userIsAdmin: true, idx: 0 },
//     { username: 'b', password: 345, lastLoginTime: null, userIsAdmin: true, idx: 1 },
//     { username: 'c', password: 678, lastLoginTime: null, userIsAdmin: false, idx: 2 }
//     ];
var gElLogIn;
var gElLogOut;
var gElSecretContent;
var gElLinkToAdmin;

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function getUsers() {
    return JSON.parse(localStorage.getItem("users"));
}

function init() {
    gElLogIn = document.querySelector('.log-in');
    gElLogOut = document.querySelector('.log-out');
    gElSecretContent = document.querySelector('.secret-content');
    gElLinkToAdmin = document.querySelector('a');
    logIn();
}

function findUser(userName, password, users) {

    var ans = users.filter(function (user, idx) {
        return user.username === userName && user.password === password
    });

    if (ans.length > 0) return ans
    else return null
}

function logIn() {
    var users = getUsers();
    var enteredUserName = prompt('UserName?');
    var enteredPassword = +prompt('Password?');
    var currUsers = findUser(enteredUserName, enteredPassword, users);
    if (currUsers) {
        var currUser = currUsers[0];
        localStorage.setItem('userIsAdmin', JSON.stringify(currUser.userIsAdmin));
        gElSecretContent.style.display = 'block';
        if (currUser.userIsAdmin) {
            gElLinkToAdmin.href = 'admin.html';
            gElLinkToAdmin.innerText = 'Link To Admin Panel';
            gElLinkToAdmin.style.display = 'block';
        }
        currUser.lastLoginTime = Date.now();
        users[currUser.idx] = currUser;
        saveUsers(users);
        gElLogOut.style.display = 'inline';
        gElLogIn.style.display = 'none';
    } else {
        alert('wrong use name/ password')
        gElLogOut.style.display = 'none';
        gElLogIn.style.display = 'inline';
    }
}

function logOut() {
    gElLinkToAdmin.style.display = 'none';
    gElSecretContent.style.display = 'none';
    gElLogIn.style.display = 'inline';
    gElLogOut.style.display = 'none';
    
}
'use-script';
// In Javascript, when page loads, select the balloons (querySelectorAll) and make them move up a bit by setting their style.bottom
// 3. Add your global data structure: gBalloons – this is our model!
// a. This should be an array of balloons objects
// b. Each object should have ‘bottom’ and ‘speed’ properties
// 4. Set an interval to update the balloon object, and then set the updated values to the balloon elements in the DOM.
// 5. When a balloon is clicked
// a. Hide it (by setting the style.display to none)
// b. Bonus: make the clicked balloon fade out, by setting style.opacity value in an interval.
// i. Hint: add an opacity property to your model and then decrease it by 0.1 in an interval until zero, then clearInterval it.
// ii. Challenge: how to correlate the clicked element and the model? How many different ways you can think of?-->

var gBalloons = [];
var gElBalloons;

function initGame() {
    gElBalloons = document.querySelectorAll('.balloon');
    gBalloons = [{ speed: 5, bottom: 5, clicked: false, opacity: 1 }, { speed: 7, bottom: 10, clicked: false, opacity: 1 }];

}

function startGame() {
    var gIntervalGame = setInterval(moveBalloons, 100, gElBalloons, gBalloons);
}

function moveBalloons(elBalloons, balloons) {
    if (gBalloons[0].bottom > 400 && gBalloons[1].bottom > 400) clearInterval(gIntervalGame);
    
    for (var i = 0; i < elBalloons.length; i++) {
        var balloon = balloons[i];
        var elBalloon = elBalloons[i];

        if (balloon.clicked === true) {
            balloon.opacity -= 0.1;
            elBalloon.style.opacity = balloon.opacity;
        }

        balloon.bottom += balloon.speed;
        elBalloon.style.bottom = balloon.bottom + 'px';
    }
}

function clickedBalloon (balloonIndex) {
    gBalloons[balloonIndex].clicked = true;
    
}






'use strict';
// This is my global state - the single source of truth!

var gCars;
var gElRoad;
var gElCars;
var gIntervalRace;
var gStartTime;
var gPrevKeyCar0;
var gPrevKeyCar1;


function initGame() {
    console.log('Car Racing App is Ready!');
    gElRoad = document.querySelector('.road');
    gElCars = document.querySelectorAll('.car');
    cancelArrowScrolling();
}


function startRace() {
    gStartTime = Date.now();

    gCars = getCars();
    gIntervalRace = setInterval(moveCars, 100);
    gElRoad.classList.add('game-on');
    toggleElementVisibility('.btn-start');

}

function getCars() {
    var cars = [{ model: 'Audi', distance: 10, speed: 0 }, { model: 'Susita', distance: 10, speed: 0 }];
    return cars;
}

// if the game is on, move cars reflect the cars model to the dom
// if game is NOT on, moveCars will set the initial distance
function moveCars() {
    var isVictory = false;
    for (var i = 0; i < gCars.length; i++) {
        var car = gCars[i];
        var elCar = gElCars[i];

        if (gIntervalRace) {
            car.distance += car.speed;
            elCar.style.marginLeft = car.distance + 'px';

            if (car.distance > gElRoad.offsetWidth) isVictory = true;
        } else {
            // when game is not on, we just go to starting point
            elCar.style.marginLeft = '5px';
        }


    }
    if (isVictory) informVictory();
}

function informVictory() {
    clearInterval(gIntervalRace);
    gIntervalRace = undefined;

    gElRoad.classList.remove('game-on');

    // Find the car with max distance 
    var carWinning = gCars.reduce(function (maxDistanceCar, car) {
        if (!maxDistanceCar || car.distance > maxDistanceCar.distance) {
            return car;
        }
        return maxDistanceCar;
    }, null);

    showVictoryPopup(carWinning);
}



function keyPressed() {
    var key = event.which;

    if (key === 49 || key === 50) {
        if (gPrevKeyCar0 !== key) {
            gCars[0].speed += 1;
            gPrevKeyCar0 = key;
        }

    } else if (key === 38 || key === 40) {
        if (gPrevKeyCar1 !== key) {
            gCars[1].speed += 1;
            gPrevKeyCar1 = key;
        }

    } else return


    // gCars[carIndex].speed += 1;
}

function showVictoryPopup(car) {
    var elPopup = document.querySelector('.popup');
    var elCarName = elPopup.querySelector('h3');
    var elRaceTime = elPopup.querySelector('h4 > span');

    elCarName.innerText = car.model;
    elRaceTime.innerText = (Date.now() - gStartTime) / 1000;

    elPopup.style.opacity = 1;
    elPopup.style.visibility = 'visible';
}

function hideVictoryPopup() {
    var elPopup = document.querySelector('.popup');
    elPopup.style.opacity = 0;
    elPopup.style.visibility = 'hidden';
    toggleElementVisibility('.btn-start');

    // This will move the cars back to starting point
    moveCars();
}



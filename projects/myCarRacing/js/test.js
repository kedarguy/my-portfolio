var carIdx      = 0;
gIntervalRace   = undefined;


/////////////// TEST 1 ////////////////////////////
gCars = getCars();
var prevSpeed = gCars[carIdx].speed;
carClicked(carIdx);

console.assert(prevSpeed === gCars[carIdx].speed, 
                'carClicked: When game is off, dont update the speed');

/////////////// TEST 2 ////////////////////////////
gIntervalRace = 1234;
carClicked(carIdx);
console.assert(prevSpeed + 10 === gCars[carIdx].speed, 
                'carClicked: When game is on, add 10 to the speed', {prevSpeed: prevSpeed, currSpeed: gCars[carIdx].speed});



console.log('Tests Done');
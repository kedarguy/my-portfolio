'use-strict';
console.log('hello images');

var gPrevClickedImg;
var gIsEveryBtnClicked = false;
var gImages = [
    { url: 'images/castle.jpg', description: 'castle' },
    { url: 'images/fjords.jpg', description: 'fjords' },
    { url: 'images/ski.jpg', description: 'ski', },
    { url: 'images/fish.jpg', description: 'fish', },
    { url: 'images/stam.jpg', description: 'stam', },
    { url: 'images/wheel.jpg', description: 'wheel', }
];
var gIntervalEveryBtn;
var gIndexCurrImg;
var gImagesIndex =[2,0,1];


var gImageElements = document.querySelectorAll('img');
var gDescElements = document.querySelectorAll('.desc');

function clickImg(currImg) {

    if (gPrevClickedImg) {
        gPrevClickedImg.classList.remove('clickedImg');
        gDescElements[gIndexCurrImg].innerHTML = null;

    }
    currImg.classList.add('clickedImg');
    gIndexCurrImg = undefined;
    for (var i = 0; i < gImageElements.length; i++) {
        if (gImageElements[i] === currImg) gIndexCurrImg = i;
    }
    // for (var j = 0; j < gImages.length; j++) {
    //     if (gImages[j].url === currImg.getAttribute("src")) {
    //         gImagesIndex = j;
    //         console.log('gimagesindex = ' + gImagesIndex);
    //     }
    // }
    gDescElements[gIndexCurrImg].innerHTML = gImages[gImagesIndex[gIndexCurrImg]].description;
    gPrevClickedImg = currImg;
}


function changeImages() {

    for (var i = 0; i < gImageElements.length; i++) {
        gImagesIndex[i] = getRandImageIndex(gImages)
        gImageElements[i].src = gImages[gImagesIndex[i]].url;

        if (gPrevClickedImg) {
            gPrevClickedImg.classList.remove('clickedImg');
            gDescElements[i].innerHTML = null;
        }
    }


}
function changeImagesInFiveSec() {

    var timeOut = setTimeout(changeImages, 1000);

}

function changeImagesEveryFiveSec() {

    if (!gIsEveryBtnClicked) {
        gIsEveryBtnClicked = true;
        document.querySelector('.everyBtn').innerHTML = 'Stop Changing Images';
        gIntervalEveryBtn = setInterval(changeImages, 1000);

    } else {
        gIsEveryBtnClicked = false;
        document.querySelector('.everyBtn').innerHTML = 'Change Images every five sec';
        clearInterval(gIntervalEveryBtn);

    }

}

function getRandImageIndex(images) {
    return parseInt(images.length * (Math.random()))

}


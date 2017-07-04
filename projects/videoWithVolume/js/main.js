var gVid = document.getElementById("myVideo");


function volumeUp() {
    if (gVid.volume < 1 && gVid.volume >= 0.9) {
        gVid.volume = 1;
    } else if (gVid.volume < 1) {
        gVid.volume += 0.1;
    }
}
function volumeDown() {
    if (gVid.volume > 0 && gVid.volume <= 0.1) {
        gVid.volume = 0;
    } else if (gVid.volume > 0) {
        gVid.volume -= 0.1;
    }
}
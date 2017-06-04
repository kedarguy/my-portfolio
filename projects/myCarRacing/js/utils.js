function toggleElementVisibility(selector) {
    var el = document.querySelector(selector);

    if (el) {
        el.style.display = (el.style.display === 'none')? 'initial' : 'none';
    } else {
        console.error('toggleElementVisibility: Cound not find: ' + selector);
    }
   
}

function cancelArrowScrolling() {
    window.onkeydown = function(event) {
    if (
        event.keyCode === 37 ||
        event.keyCode === 38 ||
        event.keyCode === 39 ||
        event.keyCode === 40
    )
    {
       event.preventDefault();
    }
};
}
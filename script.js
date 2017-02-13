(function () {
    "use strict";
    document.addEventListener('DOMContentLoaded', init);
    var mainDiv;
    var originalElem;
    var keysPressed;
    var container;
    var lastContainerHeight;
    var intervalTime = 10;
    var reg = /^[\wæøåÆØÅ!\.\,\d\-\_\:\;\<\>\¨\~\^\`\'\*\|\!\"\#\¤\%\&\/\(\)\\\+\?\=]$/;

    function init() {
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        mainDiv = document.getElementById('express-yourself');
        originalElem = document.createElement('span');
        keysPressed = [];

        container = document.getElementsByClassName('container')[0];
        updateLastContainerHeight();
    }


    function onKeyDown(event) {
        if (handleBackspace(event)) {
            return;
        }
        if (!event.key.match(reg) && event.keyCode !== 13 && event.keyCode !== 32) {
            return;
        }
        for (var i = 0; i < keysPressed.length; i++) {
            if (keysPressed[i].key === event.keyCode) {
                return;
            }
        }
        // Return key
        if (event.keyCode === 13) {
            mainDiv.appendChild(document.createElement('br'));
            return;
        }
        // Prevent space bar from triggering scroll
        if (event.keyCode === 32) {
            event.preventDefault();
        }
        var keySpan = new KeySpan(event.keyCode, intervalTime);
        keySpan.elem.innerHTML = getSign(event);
        keySpan.startLoop();
        mainDiv.appendChild(keySpan.elem);
        keysPressed.push(keySpan);

        if (lastContainerHeight < container.getBoundingClientRect().height) {
            updateLastContainerHeight();
            window.scrollTo(0, container.scrollHeight);
        }
    }

    function onKeyUp(event) {
        for (var i = 0; i < keysPressed.length; i++) {
            if (keysPressed[i].key === event.keyCode) {
                keysPressed[i].stopLoop();
                keysPressed.splice(i, 1);
            }
        }
    }

    function handleBackspace(event) {
        if (event.keyCode !== 8 || mainDiv.childElementCount === 0) {
            return;
        }
        // Stop backspace from moving the client backwards in the browser history.  
        event.preventDefault();
        mainDiv.removeChild(mainDiv.lastElementChild);
    }

    function getSign(event) {
        if (event.key.match(reg)) {
            return event.key;
        } else if (event.keyCode === 32) {
            return "&nbsp;";
        }
    }

    function updateLastContainerHeight() {
        lastContainerHeight = container.getBoundingClientRect().height;
    }
})();
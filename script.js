(function(){
    "use strict";
    document.addEventListener('DOMContentLoaded', init);
    var mainDiv, originalElem, keysPressed;
    var intervalTime = 10;
    
    function init(){
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        mainDiv = document.getElementById('express-yourself');
        originalElem = document.createElement('span');
        keysPressed = [];
    }
    
    
    function onKeyDown(event){
        if(checkBackspace(event)){
            return;
        }
        if(!event.key.match(/^[\wæøåÆØÅ!\.\,\d]$/) && event.keyCode !== 13 && event.keyCode !== 32){
            return;
        }
        for(var i = 0; i < keysPressed.length; i++){
            if(keysPressed[i].key === event.keyCode){
                return;
            }
        }
        if(event.keyCode === 13){
            mainDiv.appendChild(document.createElement('br'));
            return;
        }
        var elem = originalElem.cloneNode(true);
        elem.innerHTML = getSign(event);
        var obj = {};
        obj.key = event.keyCode;
        obj.time = 0;
        obj.elem = elem;
        obj.interval = setInterval(increment.bind(obj), intervalTime);
        keysPressed.push(obj);
        mainDiv.appendChild(obj.elem);
    }
    
    function onKeyUp(event){
        for(var i = 0; i < keysPressed.length; i++){
            if(keysPressed[i].key === event.keyCode){
                clearInterval(keysPressed[i].interval);
                keysPressed.splice(i,1);
            }
        }
    }
    
    function increment(){
        this.time += intervalTime;
        var x = this.time;
        var elem = this.elem;
        switch (true) {
            case (x < 1000):
                incrementFontSize(elem);
                break;
            case (x > 1000 && x < 2000):
                incrementFontColor(elem);
                break;
            case (x > 2000 && x < 5000):
                shake(elem);
                break;
            case (x > 5000 && x < 10000):
                rotate(elem);
                break;
        }
    }
    
    function incrementFontSize(elem){
        var pre = Boolean(elem.style.fontSize) ? elem.style.fontSize : '1';
        pre = pre.replace('rem', '');
        elem.style.fontSize = (0.1 + (+pre)) + 'rem';
    }
    
    function incrementFontColor(elem){
        var pre = Boolean(elem.style.color) ? elem.style.color : 'rgb(50, 48, 49)';
        var blue = pre.split(',')[2].replace(')','').trim();
        if(blue){
            blue++;
        }
        elem.style.color = 'rgb(50, 48, ' + (blue + 1) + ')';
    }
    
    function shake(elem){
        var transSize = Math.floor(Math.random() * 6) + 1;
        var trans = Boolean(elem.style.transform) ? elem.style.transform : 'translateX(0px)';
        trans = +trans.replace('translateX(','').replace('px)','');
        if(trans > 0){
            trans -= transSize;
        }else{
            trans += transSize;
        }
        elem.style.transform = 'translateX(' + trans + 'px)';
    }
    
    function rotate(elem){
        var trans = Boolean(elem.style.transform) && elem.style.transform.indexOf('translate') < 0 ? elem.style.transform : 'rotate(0deg)';
        trans = +trans.replace('rotate(','').replace('deg)','');
        trans += 2;
        elem.style.transform  = 'rotate(' + trans + 'deg)';
        console.log(trans);
        console.log(elem.style.transform);
    }
    
    function checkBackspace(event){
        if(event.keyCode !== 8 || mainDiv.childElementCount === 0){
            return;
        }
        mainDiv.removeChild(mainDiv.lastElementChild);
    }
    
    function getSign(event){
        if(event.key.match(/^[\wæøåÆØÅ!\.\,\d]$/)){
            return event.key;
        }else if(event.keyCode === 32){
            return "&nbsp"
        }
    }
})();
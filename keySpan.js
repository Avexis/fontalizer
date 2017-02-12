(function () {
    return KeySpan;

    function KeySpan(key, intervalTime) {
        this.broken = false;
        this.elem = document.createElement('span');
        this.key = key;
        this.interval;
        this.intervalTime = intervalTime;
        this.brokenIncrease = true;
        this.time = 0;
        this.properties = {
            fontSize: 1,
            color: {
                red: 50,
                green: 48,
                blue: 49
            },
            translateX: 0,
            rotate: 0,
        };
    }

    KeySpan.prototype.stopLoop = function stopLoop() {
        clearInterval(this.interval);
    }

    KeySpan.prototype.startLoop = function startLoop(){
        this.interval = setInterval(step, this.intervalTime);
    }

    KeySpan.prototype.step = function step() {
        this.time += this.intervalTime;
        var x = this.time;
        switch (true) {
            case (x < 1000):
                this.incrementFontSize();
                break;
            case (x >= 1000 && x < 2000):
                this.incrementFontColor();
                break;
            case (x >= 2000 && x < 5000):
                this.shake();
                break;
            case (x >= 5000 && x < 10000):
                this.rotate();
                break;
            default:
                this.breakTheWorld();
                break;
        }
    }

    KeySpan.prototype.incrementFontSize = function incrementFontSize() {
        this.fontSize += 0.1;
        this.elem.style.fontSize = fontSize + 'rem';
    }

    KeySpan.prototype.incrementFontColorstep = function incrementFontColor() {
        this.properties.color.blue++;
        this.elem.style.color = 'rgb(' + this.properties.color.red + ', ' + this.properties.color.green + ', ' + this.properties.color.blue + ')';
    }

    KeySpan.prototype.shake = function shake() {
        var transSize = Math.floor(Math.random() * 6) + 1;
        if (this.properties.translateX > 0) {
            this.properties.translateX -= transSize;
        } else {
            this.properties.translateX += transSize;
        }
        setTransformStyle();
    }

    KeySpan.prototype.rotate = function rotate() {
        this.properties.rotate += 2;
        if (this.properties.rotate >= 360) {
            this.properties.rotate = 0;
        }
        setTransformStyle();
    }

    KeySpan.prototype.flashyFlashFlash = function flashyFlashFlash() {
        this.elem.style.color = getRandomColor();
    }

    KeySpan.prototype.breakTheWorld = function breakTheWorld() {
        if (this.broken) {
            return;
        }
        this.broken = true;
        this.clearInterval();
        var val = setInterval(initBrokenWorld, 30);

        function initBrokenWorld(){
            this.rotate();
            this.flashyFlashFlash();
            if (this.properties.fontSize > 10) {
                this.brokenIncrease = false;
            } else if (this.properties.fontSize < 1) {
                this.brokenIncrease = true;
            }
            var inc = this.elem.brokenIncrease ? 0.5 : -0.5;
            this.properties.fontSize += inc;
            this.elem.style.fontSize = this.properties.fontSize + 'rem';
        }

        this.elem.addEventListener('click', function () {
            clearInterval(val);
            console.log("The world is no longer broken");
        });
    }


    /* Helper functions */
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function setTransformStyle() {
        this.elem.style.transform = 'translateX(' + this.properties.translateX + 'px) rotate(' + this.properties.rotate + "deg)";
    }
})
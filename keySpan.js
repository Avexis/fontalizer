    export class KeySpan {
        constructor(key, intervalTime) {
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

            this.stopLoop = stopLoop.bind(this);
            this.startLoop = startLoop.bind(this);
            this.step = step.bind(this);
            this.incrementFontSize = incrementFontSize.bind(this);
            this.incrementFontColor = incrementFontColor.bind(this);
            this.shake = shake.bind(this);
            this.rotate = rotate.bind(this);
            this.flashyFlashFlash = flashyFlashFlash.bind(this);
            this.breakTheWorld = breakTheWorld.bind(this);
        }
    }

    function stopLoop() {
        clearInterval(this.interval);
    }

    function startLoop() {
        this.interval = setInterval(this.step, this.intervalTime);
    }

    function step() {
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

    function incrementFontSize() {
        this.properties.fontSize += 0.1;
        this.elem.style.fontSize = this.properties.fontSize + 'rem';
    }

    function incrementFontColor() {
        this.properties.color.blue++;
        this.elem.style.color = 'rgb(' + this.properties.color.red + ', ' + this.properties.color.green + ', ' + this.properties.color.blue + ')';
    }

    function shake() {
        var transSize = Math.floor(Math.random() * 6) + 1;
        if (this.properties.translateX > 0) {
            this.properties.translateX -= transSize;
        } else {
            this.properties.translateX += transSize;
        }
        setTransformStyle.call(this);
    }

    function rotate() {
        this.properties.rotate += 2;
        if (this.properties.rotate >= 360) {
            this.properties.rotate = 0;
        }
        setTransformStyle.call(this);
    }

    function flashyFlashFlash() {
        this.elem.style.color = getRandomColor();
    }

    function breakTheWorld() {
        if (this.broken) {
            return;
        }
        var vs = this;
        this.broken = true;
        this.stopLoop();
        var val = setInterval(initBrokenWorld, 30);

        function initBrokenWorld() {
            rotate.call(vs);
            flashyFlashFlash.call(vs);
            if (vs.properties.fontSize > 10) {
                vs.brokenIncrease = false;
            } else if (vs.properties.fontSize < 1) {
                vs.brokenIncrease = true;
            }
            var inc = vs.brokenIncrease ? 0.5 : -0.5;
            vs.properties.fontSize += inc;
            vs.elem.style.fontSize = vs.properties.fontSize + 'rem';
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
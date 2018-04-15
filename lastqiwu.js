
var canvas = document.createElement('canvas');
var ctx=canvas.getContext('2d');
canvas.width = 200;
canvas.height = 200;
document.body.appendChild(canvas);

var arr = [2, 4, 8];
var start = parseInt(math.random() * 2);
var text = [];
text[0] = arr[start];
function startNum() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 200);
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 200);
    ctx.moveTo(0, 200);
    ctx.lineTo(200, 200);//外框
    ctx.moveTo(50, 0);
    ctx.lineTo(50, 200);
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 200);
    ctx.moveTo(150, 0);
    ctx.lineTo(150, 200); //三条横线
    ctx.moveTo(0, 50);
    ctx.lineTo(200, 50);
    ctx.moveTo(0, 100);
    ctx.lineTo(200, 100);
    ctx.moveTo(0, 150);
    ctx.lineTo(200, 150);//三条竖线
    ctx.stroke();
    window.requestAnimationFrame(starGame);
}

addEventListener('keydown', function (e) {
    if (e.keyCode === 37) {//left
        for(var i = 0; i <= 12; i += 4) {
            if(text[i] == text[i + 4]) {
                text[i] === null;
                text[i + 4] = 2 * text[i];

            }
            if(text[i] == null) {
                text[i] = arr[start];
                break;
            }
        }
    }else
    if (e.keyCode === 38) {//up
        for(var i = 0; i <= 3; i++) {
            if(text[i] == text[i + 1]) {
                text[i] === null;
                text[i + 1] = 2 * text[i];

            }
            if(text[i] == null) {
                text[i] = arr[start];
                break;
            }
        }
    }else
    if (e.keyCode === 39) {//right
        for(var i = 3; i <= 15; i+=4) {
            if(text[i] == text[i + 4]) {
                text[i] === null;
                text[i + 4] = 2 * text[i];
            }
            if(text[i] == null) {
                text[i] = arr[start];
                break;
            }
        }
    }else
    if (e.keyCode === 40) {//down
        for(var i = 12; i <= 15; i++) {
            if(text[i] == text[i + 1]) {
                text[i] === null;
                text[i + 1] = 2 * text[i];

            }
            if(text[i] == null) {
                text[i] = arr[start];
                break;
            }
        }
    }
    
}, false);
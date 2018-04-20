
var canvas = document.createElement('canvas');
var ctx=canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;
ctx.fillStyle="#373c38";
ctx.fillRect(0, 0, 400, 400);
ctx.font="60px Arial";
ctx.textAlign="center";
ctx.strokeStyle= "rgb(0,0,0)";
document.body.appendChild(canvas);

var arr = [2, 2, 4];
var text = {
    put: [],
    y: 100,
    x: 50
};

function sum(order) {
    for(var i = 0; i < 16; i++) {
         if(order !== 4 && ((i+1) % 4) === 0) {
            ++i;
            } 
         if(!text.put[i + order] && text.put[i] && (i + order) <= 15) {
                text.put[i + order] =  text.put[i];
                text.put[i] = undefined;
                
              }
         if(text.put[i] == text.put[i + order] && text.put[i]  && (i + order) <= 15) {         
                text.put[i + order] = 2 * text.put[i];
                text.put[i] = undefined; 
            }
              

    }
}

function reduce(order) {

    for(var i = 15; i >= 0; i--) {
         if(order !== 4 && ( i % 4 === 0)) {
            --i;
        }
        if(!text.put[i - order] && text.put[i]  && (i - order) >= 0) {               
        text.put[i - order] =  text.put[i];
        text.put[i] = undefined;
      }
      if(text.put[i] === text.put[i - order] && text.put[i] && (i - order) >= 0 ) {
       
        text.put[i - order] = 2 * text.put[i];
        text.put[i] = undefined;  
                
    }
    }
}

(function startNum() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(400, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 400);
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 400);
    ctx.moveTo(0, 400);
    ctx.lineTo(400, 400);//外框
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 400);
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 400);
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 400); //三条横线
    ctx.moveTo(0, 100);
    ctx.lineTo(400, 100);
    ctx.moveTo(0, 200);
    ctx.lineTo(400, 200);
    ctx.moveTo(0, 300);
    ctx.lineTo(400, 300);//三条竖线
    ctx.closePath();
    ctx.stroke();

    for(var i = 0; i <= 15; i ++) {
        if (text.put[i] === undefined) {
            text.put[i] = '';
        }
        ctx.fillText(text.put[i], text.x, text.y);

        if((i - 3) % 4 === 0 ) {
            text.y += 100;
            text.x = 50;
        }else {
            text.x += 100;
        }
        
    }
    text.y = 70;
    window.requestAnimationFrame(startNum);
})();

addEventListener('keydown', function (e) {
    var log = 0;
    function init(i) {
    if(!text.put[i] && !log) {
            log = 1;
            text.put[i] = arr[parseInt(Math.random() * 3)];
        }
    }
    if (e.keyCode === 37) {//left
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        reduce(1);
        for(var i = 3; i <= 15; i += 4) {
            init(i);
        }
        log = 0;
    }else
    if (e.keyCode === 38) {//up
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        reduce(4);      
        for(var i = 12; i <= 15; i++) {
            init(i);
        }
        log = 0;
    }else
    if (e.keyCode === 39) {//right
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sum(1);        
        for(var i = 0; i <= 12; i += 4) {
            init(i);
        }
        log = 0;
    }else
    if (e.keyCode === 40) {//down
        ctx.clearRect(0, 0, canvas.width, canvas.height);        
        sum(4);     
        for(var i = 0; i <= 13; i++) {
            init(i);
        }
        log = 0;
    }
    
}, false);



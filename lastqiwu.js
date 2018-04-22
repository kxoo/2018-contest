
var canvas = document.createElement('canvas');
var ctx=canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;
ctx.fillStyle="#373c38";
ctx.fillRect(0, 0, 400, 400);
ctx.font="60px Arial";
ctx.textAlign="center";     //文字对齐方式
ctx.strokeStyle= "rgb(0,0,0)";
document.body.appendChild(canvas);

var arr = [2, 2, 4];
var text = {
    put: [],
    y: 100,
    x: 50,
    score: 0
};
function sum(order) {
    for(var i = 0; i <= 15; i++) {
        evil = 0;
         if(order !== 4 && ((i+1) % 4) === 0) {
            ++i;
            } 
         if(!text.put[i + order] && text.put[i] && (i + order) <= 15) {     //下一个位置是否是空的，这个位置是否存在数，下一个位置不超过最大位置
                text.put[i + order] =  text.put[i];
                text.put[i] = undefined;
              }
         if(text.put[i] == text.put[i + order] && text.put[i]) {    //下一个位置和本位置数字是否相同以及它们不是空的        
                text.put[i + order] = 2 * text.put[i];
                text.score = text.score + text.put[i];      //算分
                text.put[i] = undefined; 
            }
    }
}

function reduce(order) {
    for(var i = 15; i >= 0; i--) {
        if(order !== 4 && ( i % 4 === 0)) {
            --i;
        }
        if(!text.put[i - order] && text.put[i]  && (i - order) >= 0) {      //下一个位置是否是空的，这个位置是否存在数，下一个位置不低于最小位置               
        text.put[i - order] =  text.put[i];
        text.put[i] = undefined;
        }
        if(text.put[i] === text.put[i - order] && text.put[i]) {    //下一个位置和本位置数字是否相同以及它们不是空的
        text.put[i - order] = 2 * text.put[i];
        text.score = text.score + text.put[i];
        text.put[i] = undefined;
        }
    }
}

function selectColor(i) {
    switch(text.put[i]) {   //不同数字不同颜色的效果
        case 2: ctx.fillStyle="#c7c3e1";
        break;
        case 4: ctx.fillStyle="#aa89bd";
        break;
        case 8: ctx.fillStyle="#8f82bc";
        break;
        case 16: ctx.fillStyle="#606da1";
        break;
        case 32: ctx.fillStyle="#6967ab";
        break;
        case 64: ctx.fillStyle="#563778";
        break;
        case 128: ctx.fillStyle="#400b36";
        break;
        case 256: ctx.fillStyle="#302833";
        break;
        case 512: ctx.fillStyle="#00081a";
        break;
        case 1024: ctx.fillStyle="#0c0c0c";
        break;
        case 2048: ctx.fillStyle="#000a02";
        break;
    }
}


(function startNum() {
    ctx.lineWidth = 5;      //绘制外框
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(400, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 400);
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 400);
    ctx.moveTo(0, 400);
    ctx.lineTo(400, 400);    //外框
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 400);
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 400);
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 400);    //三条横线
    ctx.moveTo(0, 100);
    ctx.lineTo(400, 100);
    ctx.moveTo(0, 200);
    ctx.lineTo(400, 200);
    ctx.moveTo(0, 300);
    ctx.lineTo(400, 300);   //三条竖线
    ctx.closePath();
    ctx.stroke();

    var justice = 1,evil = 0;    //判断游戏结束的参数
    for(var i = 0; i <= 15; i++) {
        selectColor(i);
        if (!text.put[i]) {     //初始化位置，不然显示undefined
            text.put[i] = '';
            justice = 0;

        }
        for(var j = 0; j <= i; j++) {
            
            if((text.put[j] === text.put[j + 1] && (j + 1) % 4 !== 0) || text.put[j] === text.put[j + 4] || (text.put[j] === text.put[j - 1] && j % 4 !== 0) || text.put[j] === text.put[j - 4] ) {
            evil = 1;
            break;
            }
            
        }
        
        ctx.fillText(text.put[i], text.x, text.y);

        if((i - 3) % 4 === 0 ) {    //位置变化的计算
            text.y += 100;
            text.x = 50;
        }else {
            text.x += 100;
        }     
    }
    text.y = 70;
    // console.log(evil);
    if(justice && !evil) {   //游戏结束的部分
        ctx.fillStyle="#ad002d";
        ctx.font="80px Arial";
        ctx.fillText("Score:", 160, 120);
        ctx.font="120px Arial";
        ctx.fillText(text.score, 200, 240);
        return;
    }

    window.requestAnimationFrame(startNum);

})();

addEventListener('keydown', function (e) {
    var log = 0;
    function init(i) {      //初始化空位置产生随机数字
    if(!text.put[i] && !log) {
            log = 1;
            text.put[i] = arr[parseInt(Math.random() * 3)];
        }
    }
    if (e.keyCode === 37) {//left
        ctx.clearRect(0, 0, canvas.width, canvas.height);   //重绘
        reduce(1);
        for(var i = 3; i <= 15; i += 4) {      //添加log标记来确保只有一个空位置生成
            init(i);
        }
    }
    if (e.keyCode === 38) {//up
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        reduce(4);      
        for(var i = 12; i <= 15; i++) {
            init(i);
        }
    }
    if (e.keyCode === 39) {//right
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sum(1);        
        for(var i = 0; i <= 12; i += 4) {
            init(i);
        }
    }
    if (e.keyCode === 40) {//down
        ctx.clearRect(0, 0, canvas.width, canvas.height);        
        sum(4);     
        for(var i = 0; i <= 13; i++) {
            init(i);
        }
    }   
}, false);



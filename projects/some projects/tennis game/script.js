let canvas;
let canvasContext;

let ballX = 5;
let ballY = 240;

let ballSpeed = 5;

window.onload = function (){
    console.log('Hello World!');
    canvas = document.querySelector('.gameCanvas');
    canvasContext = canvas.getContext('2d');
    
    let FPS = 30;
    setInterval(function(){
        callBoth();
    }, 1000/FPS);
    drawEverything();
}

function callBoth(){
    moveEverything();
    drawEverything();
}

function moveEverything(){
    ballY += ballSpeed;

    if(ballY < canvas.height-canvas.height + 10){
        ballSpeed = -ballSpeed;
    } else if (ballY > canvas.height-125){
        ballSpeed = -ballSpeed;
    }
}

function drawEverything(){

    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(ballX, ballY, 20, 120);
}
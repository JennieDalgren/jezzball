
var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");


var dir = 1;
var w = 600;
var h = 400;

var dir = 1;
var gameArea = {x:0,y:0,width:w,height:h};
var balls = [  {x:50,y:30,r:10,color:125,vx:3,vy:3},  ];
var walls = [];

var posX;
var posY;

var wallThickness = 10;

$(".jscv").on('mouseup', drawHorizontalWall);
$(document).on('keyup', toggleDirection);


function toggleDirection(e) {
  if(e.keyCode==32){
    $(canvas).toggleClass('direction');
    dir = dir * -1;

  }
}


function drawBall() {
    c.beginPath();
    c.arc(balls[0].x, balls[0].y, balls[0].r, 0, Math.PI*2);
    c.fillStyle = "#0095DD";
    c.fill();
    c.closePath();
}

function drawHorizontalWall(event) {

  if (dir === 1) {
    c.beginPath();
    c.rect(event.pageX, event.pageY, w, wallThickness);
    c.fillStyle = "#000000";
    c.fill();
    c.closePath();

    c.beginPath();
    c.rect(event.pageX, event.pageY, -w, wallThickness);
    c.fillStyle = "#999999";
    c.fill();
    c.closePath();
    posX = event.pageX;
    posY = event.pageY;
    console.log("this is pos x ", posX);
    return posX;
  }
  else {drawVerticalWall(event);}
}


function drawVerticalWall(event) {
  console.log("im in draw wall");
    c.beginPath();
    c.rect(event.pageX, event.pageY, wallThickness, h);
    c.fillStyle = "#000000";
    c.fill();
    c.closePath();

    c.beginPath();
    c.rect(event.pageX, event.pageY, wallThickness, -h);
    c.fillStyle = "#999999";
    c.fill();
    c.closePath();
    posX = event.pageX;
    posY = event.pageY;
    console.log("this is pos x ", posX);
    return posX;

}




function draw() {
    c.clearRect(0, 0, 300, 300);

    drawBall();

    drawVerticalWall(event) ;
    drawHorizontalWall(event) ;





    if(balls[0].x + balls[0].vx > w - balls[0].r || balls[0].x + balls[0].vx < balls[0].r) {
        balls[0].vx = - balls[0].vx;
    }
    if(balls[0].y + balls[0].vy > h - balls[0].r  || balls[0].y + balls[0].vy < balls[0].r) {
        balls[0].vy = - balls[0].vy;
    }


    balls[0].x += balls[0].vx;
    balls[0].y += balls[0].vy;


    // verticalWall.draw();
    // drawVerticalWall();
    // drawHorizontalWall();

    requestAnimationFrame(draw);
}

draw();



// window.onload = function() {
//   init();
//
// };


//Use this to reload the game.
// document.location.reload();

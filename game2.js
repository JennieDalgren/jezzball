




var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

// Setting up the Canvas.
var w = 600;
var h = 400;

// Setting the GameArea, Direction and Balls.
var dir = 1;
var gameArea = {x:0,y:0,width:w,height:h};
var balls = [  {x:50,y:30,r:10,color:125,vx:3,vy:3},  ];

// Setting up the Walls.
var wallThickness = 3;
var cursorCorrection = 10;
var verticalWalls = [];
var horizontalWalls = [];


// Event listners, and Key Toggles.
$(".jscv").on('mouseup', createWall);
$(document).on('keyup', toggleDirection);

function toggleDirection(e) {
  if(e.keyCode==32){
    $(canvas).toggleClass('direction');
    dir = dir * -1;

  }
}


// Creates a Wall on an Event and pushed it to the Walls Array.
function createWall(event) {
  var mouseX = event.pageX-cursorCorrection;
  var mouseY = event.pageY-cursorCorrection;

  if (dir === 1) {
    horizontalWalls.push({
      x: mouseX,
      y: mouseY
    });
    //shrink the GameArea height
    gameArea.height = mouseY;
  }
  else {
    verticalWalls.push({
      x: mouseX,
      y: mouseY
    });
    //shrink the GameArea width
    gameArea.width = mouseX;
  }
}


// Draw a Ball, this will create a Ball.
function drawBall() {
    c.beginPath();
    c.arc(balls[0].x, balls[0].y, balls[0].r, 0, Math.PI*2);
    c.fillStyle = "#000000";
    c.fill();
    c.closePath();
}

// Draw a Horizontal Wall.
function drawHorizontalWall(wall) {
  //draws first half of the wall
  c.beginPath();
  c.rect(wall.x, wall.y, w, wallThickness);
  c.fillStyle = "red";
  c.fill();
  c.closePath();

  //draws second half of the wall
  c.beginPath();
  c.rect(wall.x, wall.y, -w, wallThickness);
  c.fillStyle = "green";
  c.fill();
  c.closePath();
}

// Draw a Vertical Wall.
function drawVerticalWall(wall) {
  //draws first half of the wall
  c.beginPath();
  c.rect(wall.x, wall.y, wallThickness, h);
  c.fillStyle = "red";
  c.fill();
  c.closePath();

  //draws second half of the wall
  c.beginPath();
  c.rect(wall.x, wall.y, wallThickness, -h);
  c.fillStyle = "green ";
  c.fill();
  c.closePath();
}


// Main Draw Cycle, this will draw the came at Runtime.
function draw() {

    // Making sure the canvas is cleared between each drawcall.
    c.clearRect(0, 0, gameArea.width, gameArea.height);

    // For each of the walls in the walls Array, draw a wall.
    verticalWalls.forEach(drawVerticalWall);
    horizontalWalls.forEach(drawHorizontalWall);

    // Drawing the ball
    drawBall();

    // Collision detection for the ball and the Canvas or GameArea.
    if(balls[0].x + balls[0].vx > gameArea.width - balls[0].r ||
       balls[0].x + balls[0].vx < balls[0].r)
    {
        balls[0].vx = - balls[0].vx;
    }

    if(balls[0].y + balls[0].vy > gameArea.height - balls[0].r  ||
       balls[0].y + balls[0].vy < balls[0].r)
    {
        balls[0].vy = - balls[0].vy;
    }


    balls[0].x += balls[0].vx;
    balls[0].y += balls[0].vy;

    requestAnimationFrame(draw);
}

draw();

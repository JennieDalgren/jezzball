
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");


// Setting up the Canvas.
var WIDTH = 600;
var HEIGHT = 400;
canvas.style.border = "none";

// Setting the GameArea, Direction and Balls.
var level = 1;
var dir = 1;
var gameArea = {x:0,y:0,width:WIDTH,height:HEIGHT};
var balls = [  {x:50,y:30,r:10,color:125,vx:3,vy:3},  ];

// Setting up the Walls.
var wallThickness = 3;
var cursorCorrection = 10; //because of margin
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

function clearedArea () {

  var startingArea = WIDTH*HEIGHT; //400 * 600 original w and h
  var currentGameArea = (gameArea.width - gameArea.x) * (gameArea.height - gameArea.y);
  console.log(startingArea);
  console.log(currentGameArea);

  cleared = Math.floor(100 -(currentGameArea/startingArea*100));
  console.log("You've cleared " + cleared + " % of the field.");
  return cleared;

}

function changeLevel () {
  if (cleared > 80) {
    level++;
    balls.push({x:50,y:30,r:10,color:25,vx:1,vy:1}); //This should be newBall
    console.log("Level up! Now it's level " + level);
    console.log(balls);
    //reset game area?
  }
}


// Make the correct mouse position from the canvas, regardless of padding, margin.
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}


// Creates a Wall on an Event and pushed it to the Walls Array.
//cursorCorrection because of margin.
function createWall() {
  var mouse = getMousePos(canvas, event);

  if (dir === 1) {
    // horizontalWalls = []; // Clears the Array before making new walls.
    horizontalWalls.push({
      x: mouse.x,
      y: mouse.y
    });
    //shrink the GameArea height
    if (balls[0].y < mouse.y){
      gameArea.height = mouse.y;
      console.log("ball is above ", gameArea);
    } else {
      gameArea.y = mouse.y;
      // gameArea.height = gameArea.height - mouse.y - wallThickness;
      console.log("ball is below ", gameArea);
    }

  }
  else {
    // verticalWalls = [];   // Clears the Array before making new walls.
    verticalWalls.push({
      x: mouse.x,
      y: mouse.y
    });
    //shrink the GameArea width
    if (balls[0].x < mouse.x){
      gameArea.width = mouse.x;
      console.log("ball is to left ", gameArea);
    } else {
      gameArea.x = mouse.x;
      // gameArea.width = gameArea.width - mouse.x - wallThickness;
      console.log("ball is to right ", gameArea);
    }

  }
  clearedArea();
  changeLevel();
  return gameArea.y,gameArea.x,gameArea.height,gameArea.width ;
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
  function grow(){
    var g = 0;
   for (var i = 0; i<canvas.width; i++){
    g += 1;
  }}

  //draws first half of the wall
  c.beginPath();
  c.rect(wall.x, wall.y, setInterval(grow, 10), wallThickness);
  c.fillStyle = "red";
  c.fill();
  c.closePath();

  //draws second half of the wall
  c.beginPath();
  c.rect(wall.x, wall.y, -setInterval(grow, 10), wallThickness);
  c.fillStyle = "green";
  c.fill();
  c.closePath();


}

// Draw a Vertical Wall.
function drawVerticalWall(wall) {
  //draws first half of the wall
  c.beginPath();
  c.rect(wall.x, wall.y, wallThickness, canvas.height);
  c.fillStyle = "red";
  c.fill();
  c.closePath();

  //draws second half of the wall
  c.beginPath();
  c.rect(wall.x, wall.y, wallThickness, -canvas.height);
  c.fillStyle = "green ";
  c.fill();
  c.closePath();

}



// Main Draw Cycle, this will draw the came at Runtime.
function draw() {

    // Making sure the canvas is cleared between each drawcall.
    c.clearRect(0, 0, canvas.width, canvas.height);

    // For each of the walls in the walls Array, draw a wall.
    verticalWalls.forEach(drawVerticalWall);
    horizontalWalls.forEach(drawHorizontalWall);

    // Drawing the ball
    drawBall();

    // Collision detection for the ball and the Canvas or GameArea.
    if(balls[0].x + balls[0].vx > gameArea.width - balls[0].r ||
       balls[0].x + balls[0].vx < gameArea.x + balls[0].r)
    {
        balls[0].vx = - balls[0].vx;
    }

    if(balls[0].y + balls[0].vy > gameArea.height - balls[0].r  ||
       balls[0].y + balls[0].vy < gameArea.y + balls[0].r)
    {
        balls[0].vy = - balls[0].vy;
    }


    balls[0].x += balls[0].vx;
    balls[0].y += balls[0].vy;

    requestAnimationFrame(draw);
}

draw();



// CANVAS CONSTRUCTOR //
// ================== //
function Canvas () {
  this.level = 1;
  this.w = 600;
  this.h = 400;
  this.balls = [];
  this.canvasElement = $('#canvas');
  this.canvasContext = this.canvasElement[0].getContext('2d');

  /*
  vanilla JS way
  this.canvasElement = document.getElementById('canvas');
  this.canvasContext = this.canvasElement.getContext('2d');
  */

  this.generateBalls(); // Run once
  this.drawBalls();
  this.update();
}

Canvas.prototype.generateBalls = function () {
  for (var i = 0; i < this.level; i++){
    this.balls.push(new Ball());
  }
};

Canvas.prototype.drawBalls = function () {
  this.canvasContext.beginPath();
  this.canvasContext.arc(this.balls[0].position.x,this.balls[0].position.y, this.balls[0].radius, 0, Math.PI*2);
  this.canvasContext.fillStyle = '#000';
  this.canvasContext.fill();
  this.canvasContext.closePath();
};

Canvas.prototype.update = function () {
  this.intervalId = setInterval(this.drawBalls.bind(this), 10);
};



// BALL  CONSTRUCTOR //
// ================== //
function Ball () {
  this.position = {
    x: 50,
    y: 30
  };
  this.radius = 10;
  this.speed = {
    x: 3,
    y: 3
  };

  this.update();
}

Ball.prototype.move = function () {
  this.position.x += this.speed.x;
  this.position.y += this.speed.y;

  console.log('this.position.x', this.position.x);
  console.log('this.position.y', this.position.y);
};

Ball.prototype.bounce = function () {
  if (this.position.x  > canvas.w - this.radius || this.position.x  < this.radius) {
    this.speed.x = - this.speed.x;
  }

  if (this.position.y > canvas.h - this.radius || this.position.y < this.radius) {
    this.speed.y = - this.speed.y;
  }

  this.move();
};

Ball.prototype.update = function () {
  this.intervalId = setInterval(this.bounce.bind(this), 10);
};









// INITIALIZE JQUERY  //
// ================== //
var canvas;

$( document ).ready(function() {
    console.log( "ready!" );
    canvas = new Canvas();
});

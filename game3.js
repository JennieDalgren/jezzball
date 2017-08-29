

// CANVAS CONSTRUCTOR //
// ================== //

function Canvas () {
  this.level = 1;
  this.w = 600;
  this.h = 400;
  this.balls = [];

  this.generateBalls();
}

Canvas.prototype.generateBalls = function () {
  for (var i = 0; i < this.level; i++){
    this.balls.push(new Ball());
  }
};


// BALL  CONSTRUCTOR //
// ================== //

function Ball () {
  this.position = {
    x: 0,
    y: 0
  };
  this.radius = 10;
  this.speed = {
    x: 3,
    y: 3
  };

}





// INITIALIZE JQUERY  //
// ================== //
var canvas;

$( document ).ready(function() {
    console.log( "ready!" );
    canvas = new Canvas();
});

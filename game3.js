

// CANVAS CONSTRUCTOR //
// ================== //
function Canvas () {
  this.level = 1;
  this.cleared = 0;
  this.x = 0;
  this.y = 0;
  this.w = 600;
  this.h = 400;
  this.WIDTH  = 600;
  this.HEIGHT = 400;
  this.wallDirection = 1;
  this.balls = [];
  this.walls = {
    horizontal: [],
    vertical  : []
  };
  this.canvasElement = $('#canvas');
  this.canvasContext = this.canvasElement[0].getContext('2d');

  /*
  vanilla JS way
  this.canvasElement = document.getElementById('canvas');
  this.canvasContext = this.canvasElement.getContext('2d');
  */

  this.detectClickEvent();
  this.generateBalls(); // Run once
  this.update();
}

Canvas.prototype.detectClickEvent = function () {
  $('#canvas').on('mouseup', this.generateWalls.bind(this));

  $(document).on('keyup', this.toggleDirection.bind(this));
};

Canvas.prototype.generateBalls = function () {
  for (var i = 0; i < this.level; i++){
    this.balls.push(new Ball());
  }

};

Canvas.prototype.clearCanvas = function () {
  this.canvasContext.clearRect(0, 0, this.WIDTH, this.HEIGHT);
};


Canvas.prototype.drawBalls = function () {
  for (var i = 0; i < this.balls.length; i++){
    this.canvasContext.beginPath();
    this.canvasContext.arc(this.balls[i].position.x,this.balls[i].position.y, this.balls[i].radius, 0, Math.PI*2);
    this.canvasContext.fillStyle = '#000';
    this.canvasContext.fill();
    this.canvasContext.closePath();
  }
};


Canvas.prototype.update = function () {
  this.intervalId = setInterval(this.refreshCanvas.bind(this), 10);
};


Canvas.prototype.refreshCanvas = function () {

  this.clearCanvas();
  this.updateWalls();
  this.drawBalls();

  this.balls.forEach(function(ball){
    ball.bounce();
  });
};

Canvas.prototype.updateWalls = function () {
  this.walls.vertical.forEach(function(wall){
    this.drawWalls('vertical', wall);
  }.bind(this));
  this.walls.horizontal.forEach(function(wall){
    this.drawWalls('horizontal', wall);
  }.bind(this));
};

Canvas.prototype.checkBallsPosition = function(mouse) {

  // Horizontal
  if( this.wallDirection === 1 ) {

    for (var i = 0; i < this.balls.length; i++){

      if(this.balls[i].position.y < mouse.y) {
        this.h = mouse.y;
      }
      else {
        this.y = mouse.y;
      }
    }

  // Vertical
  } else {

    for (var j = 0; j < this.balls.length; j++){
      if(this.balls[j].position.x < mouse.x) {
        this.w = mouse.x;
      }
      else {
        this.x = mouse.x;
      }
    }
  }

};

//TODO i need to make all the walls to grow. Not only the first.
Canvas.prototype.drawWalls = function (type, wall) {
  var intervalId = setInterval(grow, 20);

  function grow(){

    var g=0;
    while(g<this.w) {g++;}
    clearInterval(intervalId);
  }

  // //draws first half of the wall
  // this.canvasContext.beginPath();
  //
  // if(type === 'horizontal') {
  //   this.canvasContext.rect(wall.position.x, wall.position.y, this.w, wall.size.h);
  // } else {
  //   this.canvasContext.rect(wall.position.x, wall.position.y, wall.size.w,this.y);
  // }
  // this.canvasContext.fillStyle = "red";
  // this.canvasContext.fill();
  // this.canvasContext.closePath();

  //draws first half of the wall
  this.canvasContext.beginPath();

  if(type === 'horizontal') {
  this.canvasContext.moveTo(this.w, wall.position.y);
  } else {
    this.canvasContext.moveTo(wall.position.x, this.h);
  }
  this.canvasContext.lineTo(wall.position.x, wall.position.y);
  this.canvasContext.strokeStyle = "red";
  this.canvasContext.stroke();
  this.canvasContext.closePath();


  //draws second half of the wall
  this.canvasContext.beginPath();
  if(type === 'horizontal') {
  this.canvasContext.moveTo(this.x, wall.position.y);
  } else {
    this.canvasContext.moveTo(wall.position.x, this.y);
  }
  this.canvasContext.lineTo(wall.position.x, wall.position.y);
  this.canvasContext.strokeStyle = "green";
  this.canvasContext.stroke();
  this.canvasContext.closePath();




  //
  // //draws second half of the wall
  // this.canvasContext.beginPath();
  // if(type === 'horizontal') {
  //   this.canvasContext.rect(wall.position.x, wall.position.y, -this.w, wall.size.h);
  // } else {
  //   this.canvasContext.rect(wall.position.x, wall.position.y, wall.size.w, -this.y);
  // }
  // this.canvasContext.fillStyle = "green";
  // this.canvasContext.fill();
  // this.canvasContext.closePath();


};

Canvas.prototype.generateWalls = function (e) {
  var restMousePosition  = document.getElementById("canvas").getBoundingClientRect();

  var mouse = {
    x: e.clientX - restMousePosition.left,
    y: e.clientY - restMousePosition.top
  };

  // CHECK
  this.checkBallsPosition(mouse);


  if(this.wallDirection == 1) {

    this.walls.horizontal.push(new Wall(mouse));

  } else {

    this.walls.vertical.push(new Wall(mouse));

  }



  this.clearedArea();
  this.changeLevel();
};

Canvas.prototype.toggleDirection = function (e){
  if(e.keyCode==32){

    this.canvasElement.toggleClass('direction');
    this.wallDirection = this.wallDirection * -1;
  }

};

Canvas.prototype.clearedArea = function () {

  var startingArea = this.WIDTH * this.HEIGHT;
  var currentGameArea = (this.w - this.x) * (this.h - this.y);

  this.cleared = Math.floor(100 -(currentGameArea/startingArea*100));
  $('#cleared').text("CLEARED AREA: " + this.cleared + "%");

};

Canvas.prototype.changeLevel = function() {
  if (this.cleared > 80) {
    this.level++;
    this.balls.push(new Ball()); //this will happen in generateBalls. restart everything with new level?
    $('#level').text("LEVEL: " + this.level);
  }
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

  //this.update();
}

Ball.prototype.move = function () {
  this.position.x += this.speed.x;
  this.position.y += this.speed.y;
};

// To make the ball bounce off the walls
Ball.prototype.bounce = function () {
  if (this.position.x  > canvas.w - this.radius || this.position.x  < canvas.x + this.radius) {
    this.speed.x = - this.speed.x;
  }

  if (this.position.y > canvas.h - this.radius || this.position.y < canvas.y + this.radius) {
    this.speed.y = - this.speed.y;
  }

  this.move();
};

/*
Ball.prototype.update = function () {
  this.intervalId = setInterval(this.bounce.bind(this), 10);
};
*/

// WALL  CONSTRUCTOR //
// ================== //
function Wall (mouse) {
  this.position = {
    x: mouse.x,
    y: mouse.y
  };
  this.size = {
    w: 10,
    h: 10
  };

  this.isGrowing = true;
}





// INITIALIZE JQUERY  //
// ================== //
var canvas;

$( document ).ready(function() {
    canvas = new Canvas();


});

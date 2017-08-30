

// CANVAS CONSTRUCTOR //
// ================== //
function Canvas () {
  this.level = 1;
  this.x = 0;
  this.y = 0;
  this.w = 600;
  this.h = 400;
  this.WIDTH = 600;
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
  console.log('this.balls', this.balls);
};


Canvas.prototype.drawBalls = function () {
  //Clear old ball position
  this.canvasContext.clearRect(this.x, this.y, this.w, this.h);


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
  this.drawBalls();
  this.updateWalls();

};

Canvas.prototype.updateWalls = function () {
  this.walls.vertical.forEach(function(wall){
    this.drawWalls('vertical', wall);
  }.bind(this));
  this.walls.horizontal.forEach(function(wall){
    this.drawWalls('horizontal', wall);
  }.bind(this));
};

Canvas.prototype.checkBallsPosition = function() {
  var shrinkHeight = true;
  var shrinkWidth  = true;

  // Horizontal
  if( this.wallDirection === 1 ) {
    for (var i = 0; i < this.balls.length; i++){
      if(this.balls[i].y < mouse.y) {
        shrinkHeight = true;
      }
      else {
        shrinkHeight = false;
      }
    }
    if(shrinkHeight) {
      this.h = mouse.y;
    } else {
      this.y = mouse.y;
    }
  // Vertical
  } else {
    for (var j = 0; j < this.balls.length; j++){
      if(this.balls[j].x < mouse.x) {
        shrinkWidth = true;
      }
      else {
        shrinkWidth = false;
      }
    }
    if(shrinkWidth) {
      this.w = mouse.x;
    } else {
      this.x = mouse.x;
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

  //draws first half of the wall
  this.canvasContext.beginPath();

  if(type === 'horizontal') {
    this.canvasContext.rect(wall.position.x, wall.position.y, intervalId, wall.size.h);
  } else {
    this.canvasContext.rect(wall.position.x, wall.position.y, wall.size.w,intervalId);
  }
  this.canvasContext.fillStyle = "red";
  this.canvasContext.fill();
  this.canvasContext.closePath();

  //draws second half of the wall
  this.canvasContext.beginPath();
  if(type === 'horizontal') {
    this.canvasContext.rect(wall.position.x, wall.position.y, -intervalId, wall.size.h);
  } else {
    this.canvasContext.rect(wall.position.x, wall.position.y, wall.size.w, -intervalId);
  }
  this.canvasContext.fillStyle = "green";
  this.canvasContext.fill();
  this.canvasContext.closePath();


};


Canvas.prototype.generateWalls = function (e) {

  var mouse = {
    x: e.pageX,
    y: e.pageY
  };

  if(this.wallDirection == 1) {
    console.log('horizontal wall is coming');
    this.walls.horizontal.push(new Wall(mouse));

  } else {
    console.log('vertical wall is coming');
    this.walls.vertical.push(new Wall(mouse));

  }


  console.log('this.walls', this.walls);
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
  console.log(startingArea);
  console.log(currentGameArea);

  cleared = Math.floor(100 -(currentGameArea/startingArea*100));
  $('#cleared').text("CLEARED AREA: " + cleared + "%");
  return cleared;
};

Canvas.prototype.changeLevel = function() {
  if (cleared > 80) {
    this.level++;
    this.balls.push(new Ball()); //this will happen in generateBalls. restart everything with new level?
    $('#level').text("LEVEL: " + this.level);
    console.log(this.balls);

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

  this.update();
}

Ball.prototype.move = function () {
  this.position.x += this.speed.x;
  this.position.y += this.speed.y;
};

// To make the ball bounce off the walls
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
    console.log(canvas.wallDirection);

});

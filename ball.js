
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");



  
function Ball (posX, posY, size, speed) {

    this.posX = posX;
    this.posY = posY;
    this.size = size;
    this.velX = speed;
    this.velY = speed;
}

//creating the ball
var ball = new Ball(20, 20, 10, 300);



Ball.prototype.drawBall = function (ball){
  ctx.fillStyle = '#ff0000';
  ctx.beginPath();
  ctx.arc(this.posX, this.posY, this.size, 0, 2*Math.PI);
  ctx.closePath();
  ctx.fill();

  this.posX += this.velX;
  this.posY += this.velY;


  if (this.posX > (canvas.width - this.size) || this.posX < 0) {
    this.velX = -this.velX;
  }
  if (this.posY > (canvas.height - this.size) || this.posY < 0) {
    this.velY = -this.velY;
  }
};





setInterval(ball.drawBall ,1000);

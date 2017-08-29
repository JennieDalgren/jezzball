// (function(){

function init(){
  var canvas = document.getElementsByTagName('canvas')[0];
  var ctx = canvas.getContext('2d');
  var ctx2 = canvas.getContext('2d');

  var dir = 1;
  var gameArea = {x:0,y:0,width:600,height:400};
  var balls = [  {x:50,y:30,r:10,color:125,vx:3,vy:3},
                ];

  $(document).on('keyup', test);
  $(document).on('keyup', toggleDirection);
  $(".jscv").on('mouseup', makeWall);



  function clearedArea () {

    var startingArea = 240000; //400 * 600 original w and h
    var currentGameArea = gameArea.width * gameArea.height;
    console.log(startingArea);
    console.log(currentGameArea);

    var cleared = Math.floor(100 -(currentGameArea/startingArea*100));
    document.getElementById('cleared').innerHTML = "You've cleared " + cleared + " % of the field.";

  }



  //Just testing things here
  function test(e) {
    if(e.keyCode==40){
      console.log(gameArea.getBoundingClientRect().top);
      console.log(gameArea.getBoundingClientRect().left);
    }
    if(e.keyCode==37){
      clearedArea();
    }
  }



  function toggleDirection(e) {
    if(e.keyCode==32){
      $(canvas).toggleClass('direction');
      dir = dir * -1;
      console.log(dir);
    }
  }

  // function onMouseClick(event) {
  //       var x = event.x - canvas.getBoundingClientRect().left;
  //       var y = event.y - canvas.getBoundingClientRect().top;
  //       if (!(Map.IsClosed(x,y))) {
  //           Walls.push(new Wall(x, y, event.which ==1 ? 'east': 'north'));
  //           Walls.push(new Wall(x, y, event.which ==1 ? 'west': 'south'));
  //       }
  //   }

  function makeWall(e) {


    ctx2.strokeStyle="#8FC5FE";
    ctx2.lineWidth=5;
    if (dir == 1 ) {

      ctx2.moveTo(gameArea.width,e.pageY);
      ctx2.lineTo(e.pageX,e.pageY);
      ctx2.stroke();

      ctx2.moveTo(0,e.pageY);
      ctx2.lineTo(e.pageX,e.pageY);
      ctx2.stroke();
        if (balls[0].y > e.pageY){
          gameArea.y = e.pageY;



          console.log('gameArea', gameArea);
        }
        else {
        gameArea.height = e.pageY;
        console.log('gameArea', gameArea);
        }
    }
    else {
      ctx2.moveTo(e.pageX,gameArea.height);
      ctx2.lineTo(e.pageX,e.pageY);
      ctx2.stroke();

      ctx2.moveTo(e.pageX,0);
      ctx2.lineTo(e.pageX,e.pageY);
      ctx2.stroke();
      if (balls[0].x > e.pageX){
        gameArea.x = e.pageX;
        console.log('gameArea', gameArea);

      }
      else {
      gameArea.width = e.pageX;
      console.log('gameArea', gameArea);
      }
    }
  }


  function draw(){

    ctx.lineWidth=1;
    ctx.fillStyle = 'black';
    ctx.fillRect(gameArea.x,gameArea.y,gameArea.width,gameArea.height);

    makeWall();


    for(var i=0; i <balls.length; i++){
      ctx.fillStyle = '#66ffff';
      ctx.beginPath();
      ctx.arc(balls[i].x,balls[i].y,balls[i].r,0,2*Math.PI,false);
        ctx.fill();


        if((balls[i].x + balls[i].r > gameArea.width) || (balls[i].x - balls[i].r < gameArea.x)){
            balls[i].vx = - balls[i].vx;
            // balls.push({x:50,y:30,r:5,color:125,vx:1,vy:1})
        }
        if((balls[i].y + balls[i].r  > gameArea.height) || (balls[i].y - balls[i].r < gameArea.y)){
             balls[i].vy = - balls[i].vy;
        }

      balls[i].x +=balls[i].vx;
      balls[i].y +=balls[i].vy;

    }


 }

 setInterval(draw, 20);


}

//invoke function init once document is fully loaded
window.addEventListener('load',init,false);

// }());  //self invoking function

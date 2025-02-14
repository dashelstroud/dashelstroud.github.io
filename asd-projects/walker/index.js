/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  const KEY = {
    LEFT:37,
    RIGHT:39,
    UP:38,
    DOWN:40,
    W:87,
    A:65,
    S:83,
    D:68,
  }

  var walker = Walker('#walker', 0, 0, 0, 0, $("#walker").width(), $("#walker").height() )
  var walker2 = Walker('#walker2', 200, 200, 0, 0, $("#walker2").width(), $("#walker2").height() )
  

  




  const BOARD_WIDTH = $("#board").width()
  const BOARD_HEIGHT = $("#board").height()
  
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);  

                     // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem(walker);
    repositionGameItem(walker2);
    redrawGameItem(walker);
    redrawGameItem(walker2);
    wallCollision(walker);
    wallCollision(walker2);
    doCollide(walker,walker2)
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
      if(event.which === KEY.LEFT){
        walker.speedX = -5;
      }
      if(event.which === KEY.RIGHT){
        walker.speedX = 5
      }
      if(event.which === KEY.UP){
        walker.speedY = -5
      }
      if(event.which === KEY.DOWN){
        walker.speedY = 5
      }


      if(event.which === KEY.A){
        walker2.speedX = -5;
      }
      if(event.which === KEY.D){
        walker2.speedX = 5
      }
      if(event.which === KEY.W){
        walker2.speedY = -5
      }
      if(event.which === KEY.S){
        walker2.speedY = 5
      }
  }

  function handleKeyUp(event) {
    if(event.which === KEY.LEFT || event.which === KEY.RIGHT){
      walker.speedX = 0;
    }
    
    if(event.which === KEY.UP || event.which === KEY.DOWN){
      walker.speedY = 0;
    }

    if(event.which === KEY.A || event.which === KEY.D){
      walker2.speedX = 0;
    }
    
    if(event.which === KEY.W || event.which === KEY.S){
      walker2.speedY = 0;
    }
}

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(obj){
    obj.posX += obj.speedX
    obj.posY += obj.speedY
  }
  function redrawGameItem(obj){
    $(obj.id).css('left', obj.posX);
    $(obj.id).css('top', obj.posY);
  }

  function wallCollision(obj){
    if(obj.posX > BOARD_WIDTH - obj.width ){
      obj.posX -= obj.speedX  
    }
    if(obj.posX < 0 ){
      obj.posX -= obj.speedX  
    }
    if(obj.posY > BOARD_HEIGHT - obj.height ){
      obj.posY -= obj.speedY  
    }
    if(obj.posY < 0 ){
      obj.posY -= obj.speedY  
    }
  }

  function doCollide(walker1, walker2) {
    if (
      walker2.posX < walker1.posX + walker1.width &&
      walker2.posX + walker2.width > walker1.posX &&
      walker2.posY < walker1.posY + walker1.height &&
      walker2.posY + walker2.height > walker1.posY
    ) {
      stopTouchingMe(walker1, walker2)
    } else {
      console.log('el');
    }
  }
}
  function stopTouchingMe(obj, obj2){
    obj.posX = 0
    obj.posY = 0
    obj.speedX = 0
    obj.speedY = 0
    obj2.posX = 200
    obj2.posY = 200
    obj2.speedX = 0
    obj2.speedY = 0
    
    alert('Stop Touching Me')
  }
  
  function Walker(id, posX, posY, speedX, speedY, width, height ){
    var obj = {
      id: id,
      posX: posX,
      posY: posY,
      speedX: speedX,
      speedY: speedY,
      width: width,
      height: height,
    }
    return obj
  }


 




  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }


  
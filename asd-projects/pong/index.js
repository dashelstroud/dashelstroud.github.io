/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  const BOARD_WIDTH = $('#board').width()
  const BOARD_HEIGHT = $('#board').height()




  
  // Game Item Objects
const KEY = {
  'W':87,
  'S':83,
  'up':38,
  'down':40,
}


  function gameItem(id,speedX, speedY ){
    var obj = {}
    obj.id = id
    obj.posX = parseFloat($(id).css('left'))
    obj.posY = parseFloat($(id).css('top'))
    obj.speedX = speedX
    obj.speedY = speedY
    obj.width = $(id).width()
    obj.height = $(id).height()

    return obj
  }

    var paddleLeft = gameItem('#paddleLeft', 0, 0)

    var paddleRight = gameItem('#paddleRight', 0, 0)

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp) ;                          // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawGameItem(paddleLeft)
    moveGameItem(paddleLeft)

    drawGameItem(paddleRight)
    moveGameItem(paddleRight)
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.W){
      paddleLeft.speedY -= 5
    }

    if(event.which === KEY.S){
      paddleLeft.speedY += 5
    }

    if(event.which === KEY.up){
      paddleRight.speedY -= 5
    }

    if(event.which === KEY.down){
      paddleRight.speedY += 5
    }
  }

  function handleKeyUp(event) {
    if(event.which === KEY.W || event.which === KEY.S){
      paddleLeft.speedY = 0;
    }
    
    if(event.which === KEY.up || event.which === KEY.down){
      paddleRight.speedY = 0;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //movement helpers

function drawGameItem(obj){
  $(obj.id).css('left', obj.posX)
  $(obj.id).css('top', obj.posY)
}

function moveGameItem(obj){
  obj.posX += obj.speedX;
  obj.posY += obj.speedY;
}


  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

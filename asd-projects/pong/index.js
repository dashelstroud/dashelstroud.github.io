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

    var ball = gameItem('#ball',decideDirection(), decideDirection())

    var leftScore = 0

    var rightScore = 0
    
    var blocker1 = gameItem('#blocker1', 0, 5) 

    var blocker2 = gameItem('#blocker2', 0, 5) 

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
    wallCollision(paddleLeft)

    drawGameItem(paddleRight)
    moveGameItem(paddleRight)
    wallCollision(paddleRight)

    drawGameItem(ball)
    moveGameItem(ball)
    wallBounce(ball)
    

    paddleBallCollision()
    
    scoring()
    
    drawGameItem(blocker1)
    moveGameItem(blocker1)
    moveBlocker(blocker1)

    drawGameItem(blocker2)
    moveGameItem(blocker2)
    moveBlocker(blocker2)
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.W){
      paddleLeft.speedY -= 13
    }

    if(event.which === KEY.S){
      paddleLeft.speedY += 13
    }

    if(event.which === KEY.up){
      paddleRight.speedY -= 13
    }

    if(event.which === KEY.down){
      paddleRight.speedY += 13
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

function doCollide(obj1, obj2) {
  if (obj1.posX + obj1.width > obj2.posX && obj1.posX < obj2.posX + obj2.width && obj1.posY + obj1.height > obj2.posY && obj1.posY < obj2.posY + obj2.height) {
    return true
  }
  return false
}

function moveBlocker(block){
  if(block.posY > BOARD_HEIGHT - block.height || block.posY < 0){
    block.speedY = -block.speedY
  }

//bounce off the blocker
if(doCollide(ball, block)){
  ball.speedX = -ball.speedX * 1.05
  ball.speedY = -ball.speedY * 1.05
}
}

function wallCollision(obj){
  if(obj.posX > BOARD_WIDTH - obj.width ){
    obj.posX -= obj.speedX  
  }
  if(obj.posX < 0 ){
    obj.posX *= obj.speedX  
  }
  if(obj.posY > BOARD_HEIGHT - obj.height ){
    obj.posY -= obj.speedY  
  }
  if(obj.posY < 0 ){
    obj.posY -= obj.speedY  
  }
}

function wallBounce(obj){
  if(obj.posY <= 0){
    obj.speedY = -obj.speedY 
  }
  if(obj.posY >= BOARD_HEIGHT - obj.height ){
    obj.speedY = -obj.speedY 
  }
}



function scoring(){
  //left side scoring
  function leftSideScoring(){
    if(ball.posX <= 0){
      leftScore++
      $("#leftScore").text(leftScore)
      reset();
    }
    }
    //right side scoring
    function rightSideScoring(){
      if(ball.posX >= 0 + BOARD_WIDTH - ball.width){
        rightScore++
        $("#rightScore").text(rightScore)
        reset()
        }
    }

    if(leftScore === 7 || rightScore === 7){
      endGame()
    }

    function leftWin(){
      if(rightScore === 7){
        $('#leftWin').show()
      }
    }

    function rightWin(){
      if(leftScore === 7){
        $('#rightWin').show()
      }
    }

    leftSideScoring()
    rightSideScoring()

    leftWin()
    rightWin()

    }

    function decideDirection(){
      var firstDirection = (Math.random() * 5 + 5)
      var oppositeDirection = -firstDirection
      
      if((Math.random() > .49)){
        return firstDirection
      }
      else{
        return oppositeDirection
      }
    }


function paddleBallCollision(){
 if(doCollide(ball,paddleLeft)){
  ball.speedX = -1.25 * ball.speedX
  ball.speedY = 0.99 * ball.speedY
 } 
 if(doCollide(ball, paddleRight)){
  ball.speedX = -1.25 * ball.speedX
  ball.speedY = 0.99 * ball.speedY
 }
}

function reset(){
  ball.posX = BOARD_WIDTH - BOARD_WIDTH/2
  ball.posY = BOARD_HEIGHT - BOARD_HEIGHT/2
  ball.speedX = decideDirection()
  ball.speedY = decideDirection()

  paddleLeft.posY = BOARD_HEIGHT - BOARD_HEIGHT/2 - paddleLeft.height
  paddleRight.posY = BOARD_HEIGHT - BOARD_HEIGHT/2 - paddleRight.height
}

function playAgainButton(){
  $('#againButton').css("top", BOARD_HEIGHT / 2);
  $('#againButton').css("left", BOARD_WIDTH / 2 - $('#againButton').width() / 2);
  $("#againButton").show();
}





//check boundaries of game itmes
//determine if objects collide
//handle the ball touching walls
//handle ball touching paddles
//handle someone winning
//handle scoring
//handle resetting
//make again button

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    playAgainButton()
    // turn off event handlers
    $(document).off();
  }
  
}

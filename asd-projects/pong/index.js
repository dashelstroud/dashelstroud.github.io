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

    var ball = gameItem('#ball',(Math.random() * 5 + 10),(Math.random() * 3 + 4))

    var leftScore = 0

    var rightScore = 0

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
    
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.W){
      paddleLeft.speedY -= 10
    }

    if(event.which === KEY.S){
      paddleLeft.speedY += 10
    }

    if(event.which === KEY.up){
      paddleRight.speedY -= 10
    }

    if(event.which === KEY.down){
      paddleRight.speedY += 10
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


function paddleBallCollision(){
 if(doCollide(ball,paddleLeft)){
  ball.speedX = -1.15 * ball.speedX
 } 
 if(doCollide(ball, paddleRight)){
  ball.speedX = -1.15 * ball.speedX
 }
}

function reset(){
  ball.posX = BOARD_WIDTH - BOARD_WIDTH/2
  ball.posY = BOARD_HEIGHT - BOARD_HEIGHT/2
  ball.speedX = (Math.random() * 5 +3)

  paddleLeft.posY = BOARD_HEIGHT - BOARD_HEIGHT/2 - paddleLeft.height
  paddleRight.posY = BOARD_HEIGHT - BOARD_HEIGHT/2 - paddleRight.height
}

function playAgainButton(){ //This function is made so that the "Play Again" button is displayed when ever the game is over. It refreshes the page when clicked.
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

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    playAgainButton()
    // turn off event handlers
    $(document).off();
  }
  
}

var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE


    function createSawBlade(x,y){
      var hitZoneSize = 25; //creates the size of the hitzone
      var damageFromObstacle = 10; //sets the damge for an obstacle
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //makes a hitzone for a sawblade
      sawBladeHitZone.x = x; //sets the saw blade hit zone to x
      sawBladeHitZone.y = y; //sets the saw blade hit zone to y
      game.addGameItem(sawBladeHitZone); // adds the saw blade to the game
      var obstacleImage = draw.bitmap("img/sawblade.png"); //creates a variable that is an image of a sawblade
      sawBladeHitZone.addChild(obstacleImage); //adds the variable as a child of the hitzone
      obstacleImage.x = -25; //changes where the image is located with its x position
      obstacleImage.y = -25; //changes where the saw blade image is located with the y position
    }
    createSawBlade(500,groundY-120)//calls the sawblade function
    createSawBlade(350,groundY-10)//calls the sawblade function
    createSawBlade(700,groundY-120) //calls the sawblade function

    function startLevel() {
      // TODO 13 goes below here



      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}

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

    //functions
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
      obstacleImage.y = -25; 
      //changes where the saw blade image is located with the y position
    }


    function createEnemy(x,y){
      var enemy = game.createGameItem("enemy", 25); //creates a variable for an enemy
      var redSquare = draw.rect(50, 50, "red"); //creates a variable that draws a red square
      redSquare.x = -25; //places the enemy hitbox's x coordinate
      redSquare.y = -25; // places the enemy hitbox's y coordinate
      enemy.addChild(redSquare); //adds the redSquare as a child of the enemy 
      enemy.x = x; // changes the x position of the redSquare
      enemy.y = y; //chnages the y position of the redSquare
      game.addGameItem(enemy); // adds enemy to the game
      enemy.velocityX = -3 // makes the enemy move
      
      enemy.onPlayerCollision = function () { // creates a function
        game.changeIntegrity(-10) // makes the player lose 10 health  on hit
        enemy.shrink()
      };
      enemy.onProjectileCollision = function(){
        game.increaseScore(100); //increases score at being shot
        //enemy.fadeOut();
        enemy.shrink(); //makes blue square shrink at being shot
      }
    }

    function createEnemy2(x,y, image, moveX,moveY,velocity, scaleX,scaleY,damage,scoreIncrease){
      var enemy = game.createGameItem("enemy", 25); //creates a variable for an enemy
      var crocodile = draw.bitmap(image); //creates a variable that draws a crocodile
      crocodile.x = moveX; //places the enemy hitbox's x coordinate
      crocodile.y = moveY; // places the enemy hitbox's y coordinate
      enemy.addChild(crocodile); //adds the redSquare as a child of the enemy 
      enemy.x = x; // changes the x position of the redSquare
      enemy.y = y; //chnages the y position of the redSquare
      game.addGameItem(enemy); // adds enemy to the game
      enemy.velocityX = velocity // makes the enemy move

      crocodile.scaleX = scaleX
      crocodile.scaleY = scaleY

      
      enemy.onPlayerCollision = function () { // creates a function
        game.changeIntegrity(damage) // makes the player lose 10 health  on hit
      };
      enemy.onProjectileCollision = function(){
        game.increaseScore(scoreIncrease); //increases score at being shot
        //enemy.fadeOut();
        enemy.shrink(); //makes blue square shrink at being shot
      }
    }
    
    function createReward(x,y){
      var reward = game.createGameItem("enemy", 25); //creates a variable for an reward
      var blueSquare = draw.rect(50, 50, "blue"); //creates a variable that draws a blue square
      blueSquare.x = -25; //places the reward hitbox's x coordinate
      blueSquare.y = -25; // places the reward hitbox's y coordinate
      reward.addChild(blueSquare); //adds the blueSquare as a child of the reward 
      reward.x = x; // changes the x position of the blueSquare
      reward.y = y; //chnages the y position of the blueSquare
      game.addGameItem(reward); // adds reward to the game
      reward.velocityX = -3 // makes the reward move
      
      reward.onPlayerCollision = function () { // creates a function
        game.changeIntegrity(+10) // makes the player GAIN 10 health  on hit
        reward.shrink(); //makes the blueSquare shrink on collision
      };
      reward.onProjectileCollision = function(){
        //reward.fadeOut();
        reward.shrink(); // makes the slueSquare shrink on being shot
      }
    }
    function createMarker(x,y){
      var marker = game.createGameItem("enemy", 25); //creates a variable for an marker
      var yellowSquare = draw.rect(50, 50, "yellow"); //creates a variable that draws a yellow square
      yellowSquare.x = -25; //places the marker hitbox's x coordinate
      yellowSquare.y = -25; // places the marker hitbox's y coordinate
      marker.addChild(yellowSquare); //adds the yellowSquare as a child of the marker 
      marker.x = x; // changes the x position of the yellowSquare
      marker.y = y; //chnages the y position of the yellowSquare
      game.addGameItem(marker); // adds marker to the game
      marker.velocityX = -3 // makes the marker move
      
      marker.onPlayerCollision = function () { // creates a function
        game.changeIntegrity(+10) // makes the player GAIN 10 health  on hit
        marker.shrink();
      };

    }


  //function calls
  createEnemy2(400,groundY-150)

    function startLevel() {
      // TODO 13 goes below here

      var level = levelData[currentLevel]
      var levelObjects = level.gameItems

      for(var i = 0;i < levelObjects.length ;i++){
        var item = levelObjects[i]
        if(item.type === "sawblade"){
          createSawBlade(item.x,item.y)
        }
        if(item.type === "enemy"){
          createEnemy(item.x,item.y)
        }
        if(item.type === "reward"){
          createReward(item.x, item.y)
        }
        if(item.type === "marker"){
          createMarker(item.x, item.y)
        }
        if(item.type === "enemy2"){
          createEnemy2(item.x,item.y, item.image, item.moveX, item.moveY, item.velocity, item.scaleX, item.scaleY, item.damage, item.scoreIncrease)
        }
      }

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

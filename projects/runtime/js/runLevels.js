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

    function createObstacle1(x,y){
      var hitZoneSize = 30; //creates the size of the hitzone
      var damageFromObstacle = 10; //sets the damge for an obstacle
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //makes a hitzone for a sawblade
      obstacleHitZone.x = x; //sets the saw blade hit zone to x
      obstacleHitZone.y = y; //sets the saw blade hit zone to y
      game.addGameItem(obstacleHitZone); // adds the saw blade to the game
      var obstacleImage = draw.bitmap("img/spooky cloud.png"); //creates a variable that is an image of a cloud
      obstacleHitZone.addChild(obstacleImage); //adds the variable as a child of the hitzone
      obstacleImage.x = -50; //changes where the image is located with its x position
      obstacleImage.y = -50; //changes where the image is located with the y position
      obstacleImage.scaleX = .175
      obstacleImage.scaleY = .2
    }

    function createObstacle2(x,y){
      var hitZoneSize = 30; //creates the size of the hitzone
      var damageFromObstacle = 10; //sets the damge for an obstacle
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //makes a hitzone for a sawblade
      obstacleHitZone.x = x; //sets the saw blade hit zone to x
      obstacleHitZone.y = y; //sets the saw blade hit zone to y
      game.addGameItem(obstacleHitZone); // adds the saw blade to the game
      var obstacleImage = draw.bitmap("img/spikes.png"); //creates a variable that is an image of a cloud
      obstacleHitZone.addChild(obstacleImage); //adds the variable as a child of the hitzone
      obstacleImage.x = -50; //changes where the image is located with its x position
      obstacleImage.y = -50; //changes where the image is located with the y position
      obstacleImage.scaleX = .05
      obstacleImage.scaleY = .1
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

    function createEnemy2(x,y,velocity){
      var enemy = game.createGameItem("enemy", 25); //creates a variable for an enemy
      var crocodile = draw.bitmap("img/cropped croc.png"); //creates a variable that draws a crocodile
      crocodile.x = -30; //places the enemy hitbox's x coordinate
      crocodile.y =  -30, // places the enemy hitbox's y coordinate
      enemy.addChild(crocodile); //adds the redSquare as a child of the enemy 
      enemy.x = x; // changes the x position of the redSquare
      enemy.y = y; //changes the y position of the redSquare
      game.addGameItem(enemy); // adds enemy to the game
      enemy.velocityX = velocity // makes the enemy move

      crocodile.scaleX = .35  // changes the size of crocodile
      crocodile.scaleY = .35 // changes the size of crocodile
      

      
      enemy.onPlayerCollision = function () { // creates a function
        game.changeIntegrity(-10) // makes the player lose 10 health  on hit
      };
      enemy.onProjectileCollision = function(){
        game.increaseScore(100); //increases score at being shot
        //enemy.fadeOut();
        enemy.shrink(); //makes blue square shrink at being shot
      }
    }

    function createEnemy3(x,y,velocity){
      var enemy = game.createGameItem("enemy", 25); //creates a variable for an enemy
      var rat = draw.bitmap("img/rat.png"); //creates a variable that draws a crocodile
      rat.x = -30; //places the enemy hitbox's x coordinate
      rat.y =  -40, // places the enemy hitbox's y coordinate
      enemy.addChild(rat); //adds the redSquare as a child of the enemy 
      enemy.x = x; // changes the x position of the redSquare
      enemy.y = y; //changes the y position of the redSquare
      game.addGameItem(enemy); // adds enemy to the game
      enemy.velocityX = velocity // makes the enemy move

      rat.scaleX = .1  // changes the size of crocodile
      rat.scaleY = .1 // changes the size of crocodile
      

      
      enemy.onPlayerCollision = function () { // creates a function
        game.changeIntegrity(-10) // makes the player lose 10 health  on hit
      };
      enemy.onProjectileCollision = function(){
        game.increaseScore(100); //increases score at being shot
        //enemy.fadeOut();
        enemy.shrink(); //makes blue square shrink at being shot
      }
    }

    function createEnemy4(x,y,velocity){
      var enemy = game.createGameItem("enemy", 25); //creates a variable for an enemy
      var fly = draw.bitmap("img/fly.png"); //creates a variable that draws a crocodile
      fly.x = -30; //places the enemy hitbox's x coordinate
      fly.y =  -40, // places the enemy hitbox's y coordinate
      enemy.addChild(fly); //adds the redSquare as a child of the enemy 
      enemy.x = x; // changes the x position of the redSquare
      enemy.y = y; //changes the y position of the redSquare
      game.addGameItem(enemy); // adds enemy to the game
      enemy.velocityX = velocity // makes the enemy move

      fly.scaleX = .2  // changes the size of crocodile
      fly.scaleY = .2 // changes the size of crocodile
      

      
      enemy.onPlayerCollision = function () { // creates a function
        game.changeIntegrity(-10) // makes the player lose 10 health  on hit
      };
      enemy.onProjectileCollision = function(){
        game.increaseScore(100); //increases score at being shot
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
        marker.shrink(); //causes the marker to disappear
        startLevel();
      };

    }


  //function calls
  

    function startLevel() { //creates a funtion named startlevel
      // TODO 13 goes below here

      var level = levelData[currentLevel] //creates a variable named level that tracks what level we are on
      var levelObjects = level.gameItems //creates a variable named levelObjects

      for(var i = 0;i < levelObjects.length ;i++){ //creates a for loop
        var item = levelObjects[i] //creates a variable named item that is equal to level.gameItems["i"]
        if(item.type === "sawblade"){ //chacks if the item.type equals sawblade
          createSawBlade(item.x,item.y) //creates a sawblade
        }
        if(item.type === "enemy"){ //chacks if item.ype equal enemy
          createEnemy(item.x,item.y) //creates an enemy
        }
        if(item.type === "reward"){ //checks if item.type equals reward
          createReward(item.x, item.y) //creates a reward
        }
        if(item.type === "marker"){  //checks if item.type equals marker
          createMarker(item.x, item.y) //creates marker
        }
        if(item.type === "enemy2"){ //checks if item.type equals enemy2
          createEnemy2(item.x,item.y,item.velocity) //creates enemy 2
        }
        if(item.type === "cloud"){
          createObstacle1(item.x,item.y)
        }
        if(item.type === "rat"){
          createEnemy3(item.x,item.y, item.velocity)
        }
        if(item.type === "fly"){
          createEnemy4(item.x,item.y,item.velocity)
        }
        if(item.type === "spikes"){
          createObstacle2(item.x,item.y)
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

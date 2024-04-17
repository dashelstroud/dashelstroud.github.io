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
    function createSawBlade(x,y){ //creates a function that makes sawBlades
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

    function createObstacle1(x,y){ //creates a function that makes an obstacle
      var hitZoneSize = 30; //creates the size of the hitzone
      var damageFromObstacle = 10; //sets the damge for an obstacle
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //makes a hitzone for a cloud
      obstacleHitZone.x = x; //sets the cloud hit zone to x
      obstacleHitZone.y = y; //sets the cloud hit zone to y
      game.addGameItem(obstacleHitZone); // adds the cloud to the game
      var obstacleImage = draw.bitmap("img/spooky cloud.png"); //creates a variable that is an image of a cloud
      obstacleHitZone.addChild(obstacleImage); //adds the variable as a child of the hitzone
      obstacleImage.x = -50; //changes where the image is located with its x position
      obstacleImage.y = -50; //changes where the image is located with the y position
      obstacleImage.scaleX = .175 //changes the size of the cloud on the x axis 
      obstacleImage.scaleY = .2//changes the size of the cloud on the y axis
    }

    function createObstacle2(x,y){
      var hitZoneSize = 10; //creates the size of the hitzone
      var damageFromObstacle = 10; //sets the damage for an obstacle
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //makes a hitzone for spikes
      obstacleHitZone.x = x; //sets the spikes hit zone to x
      obstacleHitZone.y = y; //sets the spikes hit zone to y
      game.addGameItem(obstacleHitZone); // adds the spikes to the game
      var obstacleImage = draw.bitmap("img/spikes.png"); //creates a variable that is an image of a cloud
      obstacleHitZone.addChild(obstacleImage); //adds the variable as a child of the hitzone
      obstacleImage.x = -15; //changes where the image is located with its x position
      obstacleImage.y = -50; //changes where the image is located with the y position
      obstacleImage.scaleX = .025//changes the size of the spikes on the x axis
      obstacleImage.scaleY = .075//changes the size of the spikes on the y axis
    }


    function createEnemy(x,y){ //creates a function that makes an enemy
      var enemy = game.createGameItem("enemy", 25); //creates a variable for an enemy
      var redSquare = draw.rect(50, 50, "red"); //creates a variable that draws a red square
      redSquare.x = -25; //places the enemy hitbox's x coordinate
      redSquare.y = -25; // places the enemy hitbox's y coordinate
      enemy.addChild(redSquare); //adds the redSquare as a child of the enemy 
      enemy.x = x; // changes the x position of the redSquare
      enemy.y = y; //chnages the y position of the redSquare
      game.addGameItem(enemy); // adds enemy to the game
      enemy.velocityX = -3 // makes the enemy move
      
      enemy.onPlayerCollision = function () { // creates a function that happerns on player collision
        game.changeIntegrity(-10) // makes the player lose 10 health  on hit
        enemy.shrink()//makes the enemy disapear
      };
      enemy.onProjectileCollision = function(){//creates a function that happens on touching a projectile
        game.increaseScore(100); //increases score at being shot
        //enemy.fadeOut();
        enemy.shrink(); //makes red square shrink at being shot
      }
    }

    function createEnemy2(x,y,velocity){ //makes a function that creates another enemy
      var enemy = game.createGameItem("enemy", 25); //creates a variable for an enemy
      var crocodile = draw.bitmap("img/cropped croc.png"); //creates a variable that draws a crocodile
      crocodile.x = -30; //places the enemy hitbox's x coordinate
      crocodile.y =  -30, // places the enemy hitbox's y coordinate
      enemy.addChild(crocodile); //adds the crocodile as a child of the enemy 
      enemy.x = x; // changes the x position of the crocodile
      enemy.y = y; //changes the y position of the crocosile
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
        enemy.shrink(); //makes crocodile shrink at being shot
      }
    }

    function createEnemy3(x,y,velocity){ //creates a function that makes a rat
      var enemy = game.createGameItem("enemy", 25); //creates a variable for an enemy
      var rat = draw.bitmap("img/rat.png"); //creates a variable that draws a rat
      rat.x = -30; //places the enemy hitbox's x coordinate
      rat.y =  -40, // places the enemy hitbox's y coordinate
      enemy.addChild(rat); //adds the rat as a child of the enemy 
      enemy.x = x; // changes the x position of the rat
      enemy.y = y; //changes the y position of the rat
      game.addGameItem(enemy); // adds enemy to the game
      enemy.velocityX = velocity // makes the enemy move

      rat.scaleX = .1  // changes the size of rat
      rat.scaleY = .1 // changes the size of rat
      

      
      enemy.onPlayerCollision = function () { // creates a function
        game.changeIntegrity(-15) // makes the player lose 15 health  on hit
      };
      enemy.onProjectileCollision = function(){
        game.increaseScore(100); //increases score at being shot
        //enemy.fadeOut();
        enemy.shrink(); //makes rat shrink at being shot
      }
    }

    function createEnemy4(x,y,velocity){ //crates a function that makes a fly enemy
      var enemy = game.createGameItem("enemy", 25); //creates a variable for an enemy
      var fly = draw.bitmap("img/fly.png"); //creates a variable that draws a fly
      fly.x = -30; //places the enemy hitbox's x coordinate
      fly.y =  -40, // places the enemy hitbox's y coordinate
      enemy.addChild(fly); //adds the fly as a child of the enemy 
      enemy.x = x; // changes the x position of the fly
      enemy.y = y; //changes the y position of the fly
      game.addGameItem(enemy); // adds enemy to the game
      enemy.velocityX = velocity // makes the enemy move

      fly.scaleX = .2  // changes the size of fly
      fly.scaleY = .2 // changes the size of fly
      

      
      enemy.onPlayerCollision = function () { // creates a function
        game.changeIntegrity(-20) // makes the player lose 20 health  on hit
      };
      enemy.onProjectileCollision = function(){
        game.increaseScore(100); //increases score at being shot
        //enemy.fadeOut();
        enemy.shrink(); //makes fly shrink at being shot

      }
    }

    function createBoss(x,y){ //creates a function that makes a boss
      var enemy = game.createGameItem("enemy", 25); //creates a variable for an enemy
      var boss = draw.bitmap("img/Big boss.png"); //creates a variable that draws the boss
      boss.x = -30; //places the enemy hitbox's x coordinate
      boss.y =  -500, // places the enemy hitbox's y coordinate
      enemy.addChild(boss); //adds the boss as a child of the enemy 
      enemy.x = x; // changes the x position of the boss
      enemy.y = y; //changes the y position of the boss
      game.addGameItem(enemy); // adds enemy to the game
      enemy.velocityX = -2 // makes the enemy move

      boss.scaleX = 2  // changes the size of boss
      boss.scaleY = 2 // changes the size of boss
      

      
      enemy.onPlayerCollision = function () { // creates a function
        game.changeIntegrity(-100) // makes the player lose 100 health  on hit
      };
      enemy.onProjectileCollision = function(){
        game.increaseScore(10000); //increases score at being shot
        //enemy.fadeOut();
        enemy.shrink(); //makes boss shrink at being shot
      }
    }

    
    function createReward(x,y){ //creates a function that makes a blue square
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
    function createWater(x,y){ //function that makes a water bottle reward
      var reward = game.createGameItem("enemy", 30); //creates a variable for an reward
      var water = draw.bitmap("img/refreshing beverage.png"); //creates a variable that draws a water bottle
      water.x = -75; //places the reward hitbox's x coordinate
      water.y = -30; // places the reward hitbox's y coordinate
      reward.addChild(water); //adds the water bottle as a child of the reward 
      reward.x = x; // changes the x position of the water bottle
      reward.y = y; //chnages the y position of the water bottle
      game.addGameItem(reward); // adds reward to the game
      reward.velocityX = -3 // makes the reward move
      reward.scaleX = 0.2 //chnages the size of the reward
      water.scaleY = 0.2// changes the size of the reward
      
      reward.onPlayerCollision = function () { // creates a function
        game.changeIntegrity(+10) // makes the player GAIN 10 health  on hit
        reward.shrink(); //makes the water bottle shrink on collision
      };
    }
    function createPizza(x,y){// creates a function that makes a pizza reward
      var reward = game.createGameItem("enemy", 30); //creates a variable for an reward
      var pizza = draw.bitmap("img/pizza.png"); //creates a variable that draws a pizza
      pizza.x = -30; //places the reward hitbox's x coordinate
      pizza.y = -30; // places the reward hitbox's y coordinate
      reward.addChild(pizza); //adds the pizza as a child of the reward 
      reward.x = x; // changes the x position of the pizza
      reward.y = y; //changes the y position of the pizza
      game.addGameItem(reward); // adds reward to the game
      reward.velocityX = -3 // makes the reward move
      reward.scaleX = 0.2//changes the size of the pizza on the x axis
      pizza.scaleY = 0.2// changes the size of the pizza on the y axis
      
      reward.onPlayerCollision = function () { // creates a function
        game.changeIntegrity(+20) // makes the player GAIN 10 health  on hit
        reward.shrink(); //makes the pizza shrink on collision
      };
    }
    function createMarker(x,y){// function that creates a marker
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
        startLevel(); //causes the next level to start
      };

      

    }


  //function calls
  

    function startLevel() { //creates a funtion named startlevel
      // TODO 13 goes below here

      var level = levelData[currentLevel] //creates a variable named level that tracks what level we are on
      var levelObjects = level.gameItems //creates a variable named levelObjects

      for(var i = 0;i < levelObjects.length ;i++){ //creates a for loop
        var item = levelObjects[i] //creates a variable named item that is equal to level.gameItems["i"]
        if(item.type === "sawblade"){ //checks if the item.type equals sawblade
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
        if(item.type === "cloud"){//checks if the item type is a cloud
          createObstacle1(item.x,item.y)//calls the function that creates a cloud
        }
        if(item.type === "rat"){//checks if the item type is rat
          createEnemy3(item.x,item.y, item.velocity)//calls the function that creates a rat
        }
        if(item.type === "fly"){//checks if the item type is fly
          createEnemy4(item.x,item.y,item.velocity)//calls the function that makes a fly
        }
        if(item.type === "spikes"){//chacks if the item type is spikes
          createObstacle2(item.x,item.y)//calls the function that makes spikes
        }
        if(item.type === "water"){//checks if the item typoe is water
          createWater(item.x,item.y)//calls the function that makes water
        }
        if(item.type === "pizza"){//checks if the item type is pizza
          createPizza(item.x,item.y)//calls the function that makes pizza
        }
        if(item.type === "boss"){//checks if the item type is boss
          createBoss(item.x,item.y)//calls the function that makes the boss
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

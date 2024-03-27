var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var tree;
        var buildings = [];
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();
            
            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
           //var backgroundFill = draw.rect(canvasWidth,groundY,'#574BD6'); //creates a variable named backgroundFill
           //background.addChild(backgroundFill); // adds backgroundFill as a child to the background
           var backgroundFill = draw.rect(canvasWidth,groundY,"img/Sewer-BACK.png"); //creates a variable named backgroundFill
           background.addChild(backgroundFill); // adds backgroundFill as a child to the background
           
            
            // TODO 2: - Add a moon and starfield

            for(var stars = 0;stars < 100 ;stars++){
                var circle = draw.circle(3, "white", "#87B318", 2); //creates a circle variable
                circle.x = canvasWidth * Math.random(); //makes a circle x value at a random point
                circle.y = groundY * Math.random(); // makes a circle y value at a random point
                background.addChild(circle); //added it to the screen as a child of background
            }



            var moon = draw.bitmap("img/moon.png");
            moon.x = canvasWidth-250;
            moon.y = groundY-350;
            moon.scaleX = .25;
            moon.scaleY = .25;
            background.addChild(moon);

            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < 5; i++) {  //creates a for loop starting at 0 that ends at 4
                var buildingHeight = 300 * Math.random(); //sets building variable height to 300
                var building = draw.rect(75, buildingHeight, "#8A31CC", "Black", 1); //makes a variable named building that draws a building
                building.x = 200 * i; //sets the x position of the building
                building.y = groundY - buildingHeight;//sets the y position of the building
                background.addChild(building); //sets buidling as a child of background
                buildings.push(building);//pushes building into buildings array
            }
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png");  //assigns the tree variable to an image
            tree.x = canvasWidth-225;// changes the x position of the image
            tree.y = groundY -225; //changes the y position of the image
            background.addChild(tree); //addes tree as a child of the background
            
        } // end of render function - DO NOT DELETE
    
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x = tree.x-5 //makes the tree move to the left
            if(tree.x < -200){  // checks if the tree is off the left side of the screen 
                tree.x = canvasWidth //puts the tree at the right side of the screen
            }
            // TODO 4: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++) { //creates a for loop to make the buildings move
                var building = buildings[i];
                building.x = building.x -=3
                if(building.x < -100){
                    building.x = canvasWidth;
                }
            }
        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}

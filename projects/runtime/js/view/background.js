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
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'#574BD6'); //creates a variable named backgroundFill
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
            tree.x = tree.x-3 //makes the tree move to the left
            if(tree.x < -200){  // checks if the tree is off the left side of the screen 
                tree.x = canvasWidth //puts the tree at the right side of the screen
            }
            // TODO 4: Part 2 - Parallax
            

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
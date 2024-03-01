var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle; //creates a variable named circle with no value
        var circles = []; //creates an empty array with the name circle


        // TODO 2 : Create a function that draws a circle 
        
       function drawCircle(){ //makes a function named drawCircle that draws a circle
            circle = draw.randomCircleInArea(canvas, true, true, "#999", 2);// uses a draw function to draw a circle of a random size, color, and location onto the canvas
            physikz.addRandomVelocity(circle, canvas,10, 10); //uses the physikz library to give the circle a random velocity/direction
            view.addChild(circle); // makes the circle a child of view to make the circle appear on screen
            circles.push(circle); // pushes the circle to the end of the circles array
        }

        // TODO 3 / 7 : Call the drawCircle() function 
      for(var i = 0 ; i < 100 ; i++ ){ //creates a variable i with a value of 0 makes the loop stop when i gets to 99 and makes i go up by 1
        drawCircle() // draws a circle every time the loop runs
      }


        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
           //deleted because we have iteration to do this with less repetition 

            
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
            //deleted because we have iteration to do this with less repetition 

            // TODO 8 : Iterate over the array
           for(var i = 0 ;i < circles.length ;i++ ){ //creates a variable i with a value of 0 makes the loop stop when i gets to 99 and makes i go up by 1
            drawCircle() // draws a circle every time the loop runs
            circles[i] // access the value from the array circles for every value of i
            physikz.updatePosition(circles[i]) // makes every circle move
            game.checkCirclePosition(circles[i]) // makes every circle, if they evr go off the screen, they will go back on the screen from the opposite of where they left
           }
            
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width ) {  // checks if a circle is over the right side of the screen
                circle.x = 0; //changes the circle's location to make it on the left side of the screen
            }
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            if ( circle.x < 0 ) { //checks if a circle is past the left side of the creen
                circle.x = canvas.width;//puts the circle on the right side of the screen
            }
            if ( circle.y > canvas.height ) {// checks if the circle is under the bottom of the screen
                circle.y = 0; //puts the circle at the top of the screen
            }
            if ( circle.y < 0 ) { //checks if a circle is above the top of the screen
                circle.y = canvas.height; // puts the circle at the bottom of the screen
            }


            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}

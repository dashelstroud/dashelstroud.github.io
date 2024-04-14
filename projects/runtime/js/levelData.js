var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [

         // { type: "enemy", x: 600, y: groundY-50 },

         // { type: "enemy", x: 800, y: groundY-50 },

         { type: "fly", x : 600, y : groundY - 70, velocity: -6 },

         { type: "fly", x : 900, y : groundY - 70, velocity: -6 },

          {type: "cloud", x: 1000, y: groundY - 115},

         // { type: "reward", x: 500, y: groundY-70 },

          { type: "enemy2", x: 500, y: groundY -10, velocity: -5},

          { type: "rat", x : 1000, y:groundY - 20, velocity: -3},


          { type: "rat", x : 1100, y:groundY - 20, velocity: -3},

          { type: "rat", x : 1300, y:groundY - 20, velocity: -3},

          { type: "rat", x : 1400, y:groundY - 20, velocity: -3},


          { type: "fly", x : 1600, y : groundY - 70, velocity: -6 },

          { type: "enemy2", x: 1700, y: groundY -10, velocity: -3},

          {type: "water", x : 1900, y : groundY -40},

          {type: "cloud", x: 2000, y: groundY - 115},

          { type: "enemy2", x: 2200, y: groundY -10, velocity: -3},

          { type: "marker", x: 2500, y: groundY-40 },

         
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [

          { type: "spikes", x : 600, y : groundY -20},

          { type: "spikes", x : 800, y : groundY -20},

          {type: "cloud", x: 900, y: groundY - 115},

          { type: "fly", x : 1200, y : groundY - 70, velocity: -3 },

          { type: "enemy2", x: 1350, y: groundY -10, velocity: -5},

          { type: "fly", x : 1500, y : groundY - 70, velocity: -6 },

          { type: "fly", x : 1600, y : groundY - 70, velocity: -6 },


          { type: "pizza", x : 1900, y: groundY-40},


          { type: "rat", x : 1900, y:groundY - 20, velocity: -5},

          { type: "rat", x : 2200, y:groundY - 20, velocity: -5},

          { type: "rat", x : 2300, y:groundY - 20, velocity: -5},


          {type: "boss",x: 2300, y: groundY-15 }

        ],
      },
      
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}

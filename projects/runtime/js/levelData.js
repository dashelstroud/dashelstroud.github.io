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
          { type: "sawblade", x: 350, y: groundY-120 },
          { type: "sawblade", x: 500, y: groundY-10 },
          { type: "sawblade", x: 700, y: groundY-120 },

          { type: "enemy", x: 600, y: groundY-50 },
          { type: "enemy", x: 800, y: groundY-50 },

          {type: "obstacle1", x: 1000, y: groundY - 115},

          { type: "reward", x: 500, y: groundY-70 },
          
          { type: "marker", x: 700, y: groundY-100 },

          { type: "enemy2", x: 500, y: groundY -10, velocity: -5},

          { type: "rat", x : 1000, y:groundY - 20, velocity: -3},

         // { type: "enemy2", x: 700, y: groundY -10, image: "img/rat.png", moveX: -5, moveY: -5, velocity: -4, scaleX: 0.08, scaleY: 0.08, damage: -10, scoreIncrease: 100 }
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY },
          { type: "sawblade", x: 600, y: groundY },
          { type: "sawblade", x: 900, y: groundY },
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

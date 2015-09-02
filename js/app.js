// Enemies our player must avoid
var Enemy = function(loc,speed) {
   'use strict';
   // *** Defines enemy object  ***
   this.x = 0;
   this.y= loc;
   this.speed = speed;
   // Variables applied to each of our instances go here,
   // we've provided one for you to get started

   // The image/sprite for our enemies, this uses
   // a helper we've provided to easily load images
   this.sprite = 'images/enemy-bug.png';
};

//collision detection
Enemy.prototype.iscolide = function(obj1x, obj1y, obj2x, obj2y, range){
  'use strict';
  // ************************************************************
  // *** Each enemy detects if there is collision with player ***
  // ************************************************************
   if (((obj1x + range) >= obj2x) && ((obj1x - range) <= obj2x ) && ((obj1y + range) >= obj2y) && ((obj1y - range) <= obj2y) ){
   console.log(obj1x, obj1y, obj2x, obj2y, range);
   return true;
   }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    'use strict';
    // ******************************************************
    // *** You should multiply any movement by the dt parameter
    // *** which will ensure the game runs at the same speed for
    // *** all computers.
    // *** check for collision
    // *******************************************************
    if (this.iscolide(this.x, this.y, player.x, player.y, 50)){
      this.x=0;
      player.y = 400;
      player.x = 200;
    }
    this.x = this.x + (dt * this.speed);
    if ( this.x > 490 ) {
       this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  // ***************************************************
  // *** Draws Enemy Image                                 ***
  // ***************************************************
   'use strict';
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Enemy.prototype.constuctor = Enemy;
// Now write your own layer class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  //  *************************************************
  //  *** This is the player funtion                ***
  //  *** It follows the format and function of the ***
  //  *** enemy funtion                             ***
  //  *************************************************
  //  *** To Do: Refactor code by inheriting        ***
  //  *** funtionality from enemy object.           ****
  //  *************************************************
   'use strict';
   this.speed = 81;
   this.x = 200;
   this.y = 400;
   this.sprite = 'images/char-boy.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
   'use strict';
   // You should multiply any movement by the dt parameter
   // which will ensure the game runs at the same speed for
   // all computers.
   this.dt = dt;
};

Player.prototype.handleInput= function(keycode){
  //  **********************************************************
  //  ***  This function and moves the player in the         ***
  //  ***  direction of the arrow; if the player reches the  ***
  //  *** goal player is placed in the initial position      ***
  //  *** the player is not allowed to move outside of the   ***
  //  *** game area.                                         ***
  //  **********************************************************
  'use strict';
  //37: 'left',
  //38: 'up',
  //39: 'right',
  //40: 'down'
  switch ( keycode ){
    case 'left':
      if (this.x === 0) {
        break;
      }
      this.x = this.x - 100;
      break;

    case 'up':
      if (this.y == -5  ) {
        this.y = 400;
        this.x = 200;
        break;
      }
      this.y = this.y - (this.speed);
      break;

    case 'right':
      if (this.x == 400){
        break;
      }
      this.x = this.x + 100;
      break;

    case 'down':
      if (this.y == 400){
        break;
      }
      this.y = this.y + (this.speed);
      break;
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  // ***********************************************
  // *** Draws player image                      ***
  // ***********************************************
   'use strict';
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemy = new Enemy(225, 300);
allEnemies.push( enemy );
var enemy2 = new Enemy (150, 200 );
allEnemies.push( enemy2 );
var enemy3 = new Enemy(75, 150);
allEnemies.push( enemy3 );
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  // **************************************************
  // ***  predefined function: listens for keypress ***
  // **************************************************
    'use strict';
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var NUM_INITIAL_SECTIONS = 3;
// Directions
var UP = 0;
var UP_KEY_CODE = 38;
var DOWN = 1;
var DOWN_KEY_CODE = 40;
var LEFT = 2;
var LEFT_KEY_CODE = 37;
var RIGHT = 3;
var RIGHT_KEY_CODE = 39;

function Snake() {
  this.img = document.createElement('img');
  this.img.src ='images/snake2.png';
  this.sections = [];
}

Snake.prototype = new SnakeWorldObject();

Snake.prototype.setupSnake = function(maxX, maxY) {
  // Set snake's starting coordinates
  this.setX(Math.floor(maxX/2));
  this.setY(Math.floor(maxY/2));

  // create initial number of snake sections (snake length)
  this.sections = [];
  var i;
  for ( i = 0; i < NUM_INITIAL_SECTIONS; i++) {
    var sect;
    sect = (Math.floor(maxY/2)) + i + 1;
    this.sections.unshift(new SnakeSection(Math.floor(maxX/2), sect));
  }

};
Snake.prototype.hasCollided = function(maxX, maxY) {
  // Check if snake has collided with itself or board boundaries.
  
  var snakeX= this.getX();
  var snakeY = this.getY();
  //boundary case
  if (snakeX< 0 || snakeX >= maxX || snakeY < 0 || snakeY >= maxY)
   {
    return true;
  }
  var i;
  for ( i = 0; i < this.sections.length; i++) {
    if (this.isSameLocation(this.sections[i])) {
      return true;
    }
  }

  return false;
};

Snake.prototype.endMove = function(didGrow) {
  if (!didGrow) {
    this.sections.shift();
  }
};

Snake.prototype.startMove = function() {
  this.direction = this.nextDirection;
  // Move snake here
   var x = this.getX();
  var y = this.getY();
  if (this.direction === UP) 
  {
    this.setY(y - 1);
  } 
  else if (this.direction === DOWN) 
  {
    this.setY(y + 1);
  } 
  else if (this.direction === LEFT) 
  {
    this.setX(x - 1);
  } 
  else if (this.direction === RIGHT)
   {
    this.setX(x + 1);
  }
  this.sections.push(new SnakeSection(x, y));
};

Snake.prototype.draw = function(context, spacing) {
  // Draw the complete snake
  for (var i = 0; i < this.sections.length; i++) {
    this.sections[i].draw(context, spacing);
  }
   DrawUtil.drawImage(
    context,
    this.img,
    spacing * this.getX(),
    spacing * this.getY(),
    spacing,
    spacing
   
  );
  
};

Snake.prototype.init = function(maxX, maxY) {
  this.setupListeners();
  this.setupSnake(maxX, maxY);
};

Snake.prototype.setupListeners = function() {
  this.direction = UP;
  this.nextDirection = UP;
  var snake = this;
  document.addEventListener('keydown', function(e) {
    // Set snake's nextDirection based on keypress.
    if (e.keyCode === UP_KEY_CODE && snake.direction !== DOWN)
     {
      snake.nextDirection = UP;
    }
     else if (e.keyCode === DOWN_KEY_CODE && snake.direction !== UP)
     {
      snake.nextDirection = DOWN;
    } 
    else if (e.keyCode === RIGHT_KEY_CODE && snake.direction !== LEFT)     {
      snake.nextDirection = RIGHT;
    }
     else if (e.keyCode === LEFT_KEY_CODE && snake.direction !== RIGHT)    {
      snake.nextDirection = LEFT;
    } 
    else
    {
      return;
    }
    e.preventDefault();
  });
};

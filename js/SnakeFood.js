function SnakeFood() {
  this.img = document.createElement("img");
}
SnakeFood.prototype = new SnakeWorldObject();

SnakeFood.prototype.randomizePosition = function (maxX, maxY) {
  // Set snake food at random positions.
  this.setX(Math.floor(Math.random() * maxX));
  this.setY(Math.floor(Math.random() * maxY));
  this.img.src = `images/food${Math.ceil(Math.random() * 10)}.png`;
};

SnakeFood.prototype.draw = function (context, spacing) {
  DrawUtil.drawImage(
    context,
    this.img,
    spacing * this.getX(),
    spacing * this.getY(),
    spacing,
    spacing
  );
};

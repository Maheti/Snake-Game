var EXCESS = 8;
var RADIUS_EXCESS = 2;
var DrawUtil = {
  drawImage: function (context, img, x, y, width, height) {
    context.drawImage(
      img,
      x - EXCESS,
      y - EXCESS,
      width + EXCESS * 2,
      height + EXCESS * 2
    );
  },

  drawCircle: function (context, centerX, centerY, radius, color) {
    context.beginPath();
    context.arc(centerX, centerY, radius + RADIUS_EXCESS, 0, 2 * Math.PI);
    // let grad = context.createLinearGradient(0, 0, 170, 0);
    // grad.addColorStop(0, "black");
    // grad.addColorStop(0.5, "green");
    // grad.addColorStop(1, "white");
    context.fillStyle = color;
    context.fill();
    context.closePath();
  },
};

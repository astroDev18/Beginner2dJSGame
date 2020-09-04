define(["Jquery", "Class"], function ($, Class) {
  // Private Variables
  var canvas, title, width, height, graphics;

  var Display = Class.extend({
    init: function (_title, _width, _height) {
      title = _title;
      width = _width;
      height = _height;
      createDisplay();
    },
  });

  // Private Method
  function createDisplay() {
    document.title = title;
    var body = document.body;
    body.innerHTML =
      "<canvas id='canvas' width='" +
      width +
      "' height='" +
      height +
      "'></canvas>";
    graphics = document.getElementById("canvas").getContext("2d");
  }

  // Getters

  Display.prototype.getTitle = function () {
    return title;
  };

  Display.prototype.getWidth = function () {
    return width;
  };

  Display.prototype.getHeight = function () {
    return height;
  };

  Display.prototype.getGraphics = function () {
    return graphics;
  };
  // allows us to pass in an asset with x and y so we can use it in draw function
  // we are adding extra functionality to default draw image so we can pass it extra info
  // like sheet size and cropping
  CanvasRenderingContext2D.prototype.myDrawImage = function (
    asset,
    _x,
    _y,
    _width,
    _height
  ) {
    this.drawImage(
      asset.sheet,
      asset.x,
      asset.y,
      asset.width,
      asset.height,
      _x,
      _y,
      _width,
      _height
    );
  };

  return Display;
});

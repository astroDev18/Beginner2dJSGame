define(["Class"], function (Class) {
  var xOffset, yOffset, handler;
  var GameCamera = Class.extend({
    init: function (_handler, _xOffset, _yOffset) {
      xOffset = _xOffset;
      yOffset = _yOffset;
      handler = _handler;
    },
    centerOnEntity: function (e) {
      xOffset = e.getX() - handler.getWidth() / 2;
      yOffset = e.getY() - handler.getHeight() / 2;
    },
    move: function (_xAmt, _yAmt) {
      xOffset += _xAmt;
      yOffset += _yAmt;
    },
    // Getters
    getxOffset: function () {
      return parseInt(xOffset);
    },
    getyOffset: function () {
      return parseInt(yOffset);
    },
    // Setters
    setxOffset: function () {
      xOffset = _offset;
    },
    setyOffset: function () {
      yOffset = _offset;
    },
  });
  return GameCamera;
});

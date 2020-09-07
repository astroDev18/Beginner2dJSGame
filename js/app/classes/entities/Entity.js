define(["Class", "Rectangle"], function (Class, Rectangle) {
  var Entity = Class.extend({
    init: function (_handler, _x, _y, _width, _height) {
      this.x = _x;
      this.y = _y;
      this.width = _width;
      this.height = _height;
      this.handler = _handler;
      this.bounds = new Rectangle(0, 0, _width, _height);
    },
    tick: function (_dt) {
      throw "Entities Must Have a Tick Function";
    },
    render: function (_g) {
      throw "Entities Must Have a Tick Function";
    },
    // Getters
    getX: function () {
      return this.x;
    },
    getY: function () {
      return this.y;
    },
    getWidth: function () {
      return this.width;
    },
    getHeight: function () {
      return this.height;
    },
    // gets collison of entity before moving character at the boundary of box at next tick
    // if true no movement (collision) else allow movement
    getCollisionBounds: function (xOffset, yOffset) {
      return new Rectangle(
        parseInt(this.x + this.bounds.x + xOffset),
        parseInt(this.y + this.bounds.y + yOffset),
        this.bounds.width,
        this.bounds.height
      );
    },
    checkEntityCollisions: function (xOffset, yOffset) {
      var candidates = this.handler
        .getWorld()
        .getSpatialGrid()
        .retrieve(
          new Rectangle(
            this.x + this.bounds.x + xOffset,
            this.y + this.bounds.y + yOffset,
            this.bounds.width,
            this.bounds.height
          ),
          this
        );
      console.log(candidates.length);
      for (var i = 0; i < candidates.length; i++) {
        var e = candidates[i];
        if (e != this) {
          if (
            e
              .getCollisionBounds(0, 0)
              .intersects(this.getCollisionBounds(xOffset, yOffset))
          ) {
            return true;
          }
        }
      }
      return false;
    },
    // Setters
    setX: function (_x) {
      this.x = _x;
    },
    setY: function (_y) {
      this.y = _y;
    },
    setWidth: function (_width) {
      this.width = _width;
    },
    setHeight: function (_height) {
      this.height = _height;
    },
  });

  return Entity;
});

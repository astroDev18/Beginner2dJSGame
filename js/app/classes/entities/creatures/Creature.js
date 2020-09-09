define(["Entity", "Tile", "Rectangle"], function (Entity, Tile, Rectangle) {
  var DEFAULT_SPEED = 250,
    DEFAULT_HEALTH = 10,
    DEFAULT_CREATURE_WIDTH = 64,
    DEFAULT_CREATURE_HEIGHT = 64;
  // Creature Variables

  var Creature = Entity.extend({
    init: function (_handler, _x, _y, _width, _height) {
      this._super(_handler, _x, _y, _width, _height);
      this.health = DEFAULT_HEALTH;
      this.speed = DEFAULT_SPEED;
      this.xMove = 0;
      this.yMove = 0;
    },
    move: function () {
      // only if we are moving
      if (Math.abs(this.xMove) > 0 || Math.abs(this.yMove) > 0) {
        // remove ourselves at the current grid square and reinsert ourselves
        // adding ourself to a new square we moved in
        // only if we have moved at all, and only if we don't already exist in that square
        this.handler
          .getWorld()
          .getSpatialGrid()
          .remove(
            new Rectangle(
              this.x + this.bounds.x,
              this.y + this.bounds.y,
              this.bounds.width,
              this.bounds.height
            ),
            this
          );
        // before we update check if new position will collide, if it doesn't then allow movmeent
        if (!this.checkEntityCollisions(this.xMove, 0)) this.moveX();
        if (!this.checkEntityCollisions(0, this.yMove)) this.moveY();
        this.handler
          .getWorld()
          .getSpatialGrid()
          .insert(
            new Rectangle(
              this.x + this.bounds.x,
              this.y + this.bounds.y,
              this.bounds.width,
              this.bounds.height
            ),
            this
          );
      }
    },
    moveX: function () {
      if (this.xMove > 0) {
      }
    },
    moveX: function () {
      if (this.xMove > 0) {
        var tx = parseInt(
          (this.x + this.xMove + this.bounds.x + this.bounds.width) /
            Tile.TILEWIDTH
        );
        if (
          !this.collisionWithTile(
            tx,
            parseInt((this.y + this.bounds.y) / Tile.TILEHEIGHT)
          ) &&
          !this.collisionWithTile(
            tx,
            parseInt(
              (this.y + this.bounds.y + this.bounds.height) / Tile.TILEHEIGHT
            )
          )
        ) {
          this.x += this.xMove;
        } else {
          this.x = tx * Tile.TILEWIDTH - this.bounds.x - this.bounds.width - 1;
        }
      } else {
        var tx = parseInt(
          (this.x + this.xMove + this.bounds.x) / Tile.TILEWIDTH
        );
        if (
          !this.collisionWithTile(
            tx,
            parseInt((this.y + this.bounds.y) / Tile.TILEHEIGHT)
          ) &&
          !this.collisionWithTile(
            tx,
            parseInt(
              (this.y + this.bounds.y + this.bounds.height) / Tile.TILEHEIGHT
            )
          )
        ) {
          this.x += this.xMove;
        } else {
          this.x = tx * Tile.TILEWIDTH + Tile.TILEWIDTH - this.bounds.x;
        }
      }
    },

    moveY: function () {
      if (this.yMove > 0) {
        var ty = parseInt(
          (this.y + this.yMove + this.bounds.y + this.bounds.height) /
            Tile.TILEHEIGHT
        );
        if (
          !this.collisionWithTile(
            parseInt((this.x + this.bounds.x) / Tile.TILEWIDTH),
            ty
          ) &&
          !this.collisionWithTile(
            parseInt(
              (this.x + this.bounds.x + this.bounds.width) / Tile.TILEWIDTH
            ),
            ty
          )
        ) {
          this.y += this.yMove;
        } else {
          this.y =
            ty * Tile.TILEHEIGHT - this.bounds.y - this.bounds.height - 1;
        }
      } else {
        var ty = parseInt(
          (this.y + this.yMove + this.bounds.y) / Tile.TILEHEIGHT
        );
        if (
          !this.collisionWithTile(
            parseInt((this.x + this.bounds.x) / Tile.TILEWIDTH),
            ty
          ) &&
          !this.collisionWithTile(
            parseInt(
              (this.x + this.bounds.x + this.bounds.width) / Tile.TILEWIDTH
            ),
            ty
          )
        ) {
          this.y += this.yMove;
        } else {
          this.y = ty * Tile.TILEHEIGHT + Tile.TILEHEIGHT - this.bounds.y;
        }
      }
    },
    collisionWithTile: function (_x, _y) {
      return this.handler.getWorld().getTile(_x, _y).isSolid();
    },
    // Getters
    getHealth: function () {
      return this.health;
    },
    getSpeed: function () {
      return this.speed;
    },
    // gives current absolute speed regardless of direction by giving us distance travelled since last check essentially speed
    // so we check every tick and if his speed becomes slow we start timing it how long has he not been moving then we assume something happen and we stop him or go to the next position
    // so he doesn't just keep running forever when he cannot find a path
    getMovementSpeed: function () {
      this.lastX = this.currentX || this.x;
      this.lastY = this.currentY || this.y;
      this.currentX = this.x;
      this.currentY = this.y;
      var speedX = this.currentX - this.lastX;
      var speedY = this.currentY - this.lastY;
      return Math.sqrt(speedX * speedX + speedY * speedY);
    },
    // setters
    setHealth: function (_health) {
      this.health = _health;
    },
    setSpeed: function (_speed) {
      this.health = _speed;
    },
  });
  // Static Variables
  Creature.DEFAULT_SPEED = DEFAULT_SPEED;
  Creature.DEFAULT_HEALTH = DEFAULT_HEALTH;
  Creature.DEFAULT_CREATURE_WIDTH = DEFAULT_CREATURE_WIDTH;
  Creature.DEFAULT_CREATURE_HEIGHT = DEFAULT_CREATURE_HEIGHT;
  return Creature;
});

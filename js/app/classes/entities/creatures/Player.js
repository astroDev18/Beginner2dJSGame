define(["Creature", "Assets", "HealthBar"], function (
  Creature,
  Assets,
  HealthBar
) {
  var Player = Creature.extend({
    init: function (_handler, _x, _y) {
      this._super(
        _handler,
        _x,
        _y,
        Creature.DEFAULT_CREATURE_WIDTH,
        Creature.DEFAULT_CREATURE_HEIGHT
      );
      this.assets = Assets.getAssets("player");
      this.bounds.x = 16;
      this.bounds.y = 32;
      this.bounds.width = 25;
      this.bounds.height = 32;
      this.path = [];
      this.timestopped = 0;
      var hb_prop = {
        // light grey
        color: "#008900",
        yoffset: 20,
        // nodes
        nodes: 100,
        split: 0,
        width: 100,
        height: 8,
        // fadetime: 0.96,
        // render on full health
        renderOnFull: "on",
        border: {
          show: true,
          color: "#333",
          width: 2,
        },
      };
      this.healthbar = new HealthBar(_handler, this, hb_prop);
    },
    tick: function (_dt) {
      // this.getInput(_dt);
      this.followPath(_dt);
      this.move();
      // this.handler.getGameCamera().centerOnEntity(this);
      this.assets.animations.walk_right.tick();
      this.assets.animations.walk_left.tick();
      this.assets.animations.walk_up.tick();
      this.assets.animations.walk_down.tick();
      this.assets.animations.idle.tick();
    },
    render: function (_g) {
      _g.myDrawImage(
        this.getCurrentAnimationFrame(),
        this.x - this.handler.getGameCamera().getxOffset(),
        this.y - this.handler.getGameCamera().getyOffset(),
        this.width,
        this.height,
        this.healthbar.render(_g)
      );
    },
    click: function (_btn) {
      // get mouse position, add to it the camera offsets, push that new position into the array,
      // which causes length of array to be greater then 0 so it runs this function
      // then run else which splices the current waypoint of the array which could cause it to be empty and stop the character
      if (_btn === "right") {
        var pos = this.handler.getMouseManager().getMousePosition();
        var waypoint = {
          x: pos.x + this.handler.getGameCamera().getxOffset() - this.width / 2,
          y:
            pos.y + this.handler.getGameCamera().getyOffset() - this.height / 2,
        };
        this.path.push(waypoint);
      }
    },
    // create object and push into array which have x and y cords and angle to tell the player which way to go

    followPath: function (_dt) {
      if (this.path.length > 0) {
        var path = this.path[0];

        if (this.getDistance(path) >= 10 && this.timeStopped < 0.5) {
          if (this.getMovementSpeed() < 0.2) {
            this.timeStopped += 1 * _dt;
          }

          var angle = this.getAngleTo(path);
          this.xMove = Math.cos(angle) * this.speed * _dt;
          this.yMove = Math.sin(angle) * this.speed * _dt;
        } else {
          this.timeStopped = 0;
          this.path.splice(0, 1);
        }
      } else {
        this.xMove = 0;
        this.yMove = 0;
      }
    },

    getInput: function (_dt) {
      this.xMove = 0;
      this.yMove = 0;
      if (this.handler.getKeyManager().up) {
        this.yMove = -this.speed * _dt;
      }
      if (this.handler.getKeyManager().down) {
        this.yMove = this.speed * _dt;
      }
      if (this.handler.getKeyManager().left) {
        this.xMove = -this.speed * _dt;
      }
      if (this.handler.getKeyManager().right) {
        this.xMove = this.speed * _dt;
      }
    },
    getCurrentAnimationFrame: function () {
      if (this.xMove < 0 && Math.abs(this.xMove) > Math.abs(this.yMove)) {
        return this.assets.animations.walk_left.getCurrentFrame();
      } else if (
        this.xMove > 0 &&
        Math.abs(this.xMove) > Math.abs(this.yMove)
      ) {
        return this.assets.animations.walk_right.getCurrentFrame();
      } else if (
        this.yMove < 0 &&
        Math.abs(this.xMove) < Math.abs(this.yMove)
      ) {
        return this.assets.animations.walk_up.getCurrentFrame();
      } else if (
        this.yMove > 0 &&
        Math.abs(this.xMove) < Math.abs(this.yMove)
      ) {
        return this.assets.animations.walk_down.getCurrentFrame();
      } else {
        return this.assets.animations.idle.getCurrentFrame();
      }
    },
  });

  return Player;
});

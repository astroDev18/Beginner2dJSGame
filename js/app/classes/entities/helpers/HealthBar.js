define(["Helper"], function (Helper) {
  var HealthBar = Helper.extend({
    init: function (_handler, _ent, _prop) {
      // properties for health bar
      this.handler = _handler;
      this.ent = _ent;
      this.start = _ent.health;
      this.nodes = this.totalnodes = _prop.nodes;
      this.renderOnFull = _prop.renderOnFull || "on";
      this.width = _prop.width || 75;
      this.height = _prop.height || 10;
      this.xoff = _prop.xoffset || -_ent.getWidth() / 2 + this.width / 2;
      this.yoff = _prop.yoffset || 10;
      this.color = _prop.color;
      this.split = _prop.split || 0;
      // fills node bar
      this.nodewidth = this.width / this.nodes;
      this.nodeheight = this.height;
      this.fadetime = _prop.fadetime || 1;
      this.opacity = _prop.opacity || 1;
      this.border = _prop.border || { show: true, color: "black", width: 3 };
      //   test if damage is working
      //     setInterval(function () {
      //       _ent.takeDamage(10);
      //     }, 1000);
    },
    render: function (_g) {
      this.opacity *= this.fadetime;
      _g.globalAlpha = this.opacity;
      if (this.renderOnFull == "on" || this.ent.health < this.start) {
        if (this.border.show) {
          _g.fillStyle = this.border.color;
          // creating box thats the color of the border and also the size of our healthbar plus the width of the border that we set on all sides (so parameter) and add 2 times width so adds a border on sides and top of border
          // creates node aligned to correct offsets for character
          _g.fillRect(
            this.ent.getX() -
              this.xoff -
              this.handler.getGameCamera().getxOffset() -
              this.border.width,
            this.ent.getY() -
              this.yoff -
              this.handler.getGameCamera().getyOffset() -
              this.border.width,
            this.width + this.border.width * 2,
            this.height + this.border.width * 2
          );
          // renders all health nodes, even unhealthy ones
          for (var i = 0; i < this.totalnodes; i++) {
            _g.globalAlpha = 0.5 * this.opacity;
            _g.fillStyle = this.color;
            _g.fillRect(
              -(this.nodewidth * this.totalnodes) +
                this.split / 2 +
                this.totalnodes * this.nodewidth +
                this.nodewidth * i +
                this.ent.getX() -
                this.xoff -
                this.handler.getGameCamera().getxOffset(),
              this.ent.getY() -
                this.yoff -
                this.handler.getGameCamera().getyOffset(),
              this.nodewidth - this.split,
              this.height,
              (_g.globalAlpha = 1 * this.opacity)
            );
          }
          // renders healthy nodes
          for (var i = 0; i < this.nodes; i++) {
            _g.fillStyle = this.color;
            _g.fillRect(
              -(this.nodewidth * this.totalnodes) +
                this.split / 2 +
                this.totalnodes * this.nodewidth +
                this.nodewidth * i +
                this.ent.getX() -
                this.xoff -
                this.handler.getGameCamera().getxOffset(),
              this.ent.getY() -
                this.yoff -
                this.handler.getGameCamera().getyOffset(),
              this.nodewidth - this.split,
              this.height
            );
          }
        }
      }
      _g.globalAlpha = 1;
    },
    // updates how many healthy nodes we have
    update: function () {
      this.opacity = 1;
      this.nodes = Math.ceil(this.totalnodes * (this.ent.health / this.start));
    },
  });
  HealthBar.DEFAULT_NODES = 10;
  HealthBar.DEFAULT_Y_OFFSET = 10;
  HealthBar.DEFAULT_X_OFFSET = 0;
  return HealthBar;
});

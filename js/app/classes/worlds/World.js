define(["Class", "TileLoader", "Utils"], function (Class, Tile, Utils) {
  var World = Class.extend({
    init: function (_path, _handler) {
      this.tiles = [];
      this.loadWorld(_path);
      this.handler = _handler;
    },
    loadWorld: function (_path) {
      var file = Utils.loadFileAsString(_path);
      var tokens = file.replace(/\n/g, " ").split(" ");
      this.width = tokens[0];
      this.height = tokens[1];
      this.spawnX = tokens[2] * Tile.TILEWIDTH;
      this.spawnY = tokens[3] * Tile.TILEHEIGHT;
      for (y = 0; y < this.height; y++) {
        for (x = 0; x < this.width; x++) {
          if (!this.tiles[x]) this.tiles[x] = [];
          this.tiles[x][y] = parseInt(tokens[x + y * this.width + 4]);
        }
      }
    },
    tick: function (_dt) {},
    render: function (_g) {
      for (y = 0; y < this.height; y++) {
        for (x = 0; x < this.width; x++) {
          this.getTile(x, y).render(
            _g,
            x * Tile.TILEWIDTH - this.handler.getGameCamera().getxOffset(),
            y * Tile.TILEHEIGHT - this.handler.getGameCamera().getyOffset()
          );
        }
      }
    },

    getTile: function (_x, _y) {
      return Tile.tiles[this.tiles[_x][_y]];
    },
  });
  return World;
});

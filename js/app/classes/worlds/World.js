define(["Class", "TileLoader"], function (Class, Tile) {
  var World = Class.extend({
    init: function (_path) {
      this.tiles = [];
      this.width = 20;
      this.height = 20;
      this.loadWorld(_path);
    },
    loadWorld: function (_path) {
      for (x = 0; x < this.width; x++) {
        for (y = 0; y < this.height; y++) {
          if (!this.tiles[x]) this.tiles[x] = [];
          this.tiles[x][y] = 1;
        }
      }
    },
    tick: function (_dt) {},
    render: function (_g) {
      for (y = 0; y < this.height; y++) {
        for (x = 0; x < this.width; x++) {
          this.getTile(x, y).render(
            _g,
            x * Tile.TILEWIDTH,
            y * Tile.TILEHEIGHT
          );
        }
      }
    },
    getTile: function (x, y) {
      return Tile.tiles[this.tiles[x][y]];
    },
  });
  return World;
});

define(["Tile"], function (Tile) {
  var DirtTile = Tile.extend({
    init: function (_id) {
      this._super(Tile.assets.grass, _id);
    },
  });
  return DirtTile;
});

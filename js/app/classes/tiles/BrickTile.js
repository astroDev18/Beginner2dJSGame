define(["Tile"], function (Tile) {
    var BrickTile = Tile.extend({
        init: function (_id) {
            this._super(Tile.assets.brick, _id);
        },
        isSolid: function () {
            return true;
        },
    });
    return BrickTile;
});

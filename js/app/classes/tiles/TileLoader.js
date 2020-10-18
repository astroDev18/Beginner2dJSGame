define(["Tile", "GrassTile", "DirtTile", "StoneTile", "BrickTile"], function (
  Tile,
  GrassTile,
  DirtTile,
  StoneTile,
  BrickTile
) {
  Tile.grassTile = new GrassTile(0);
  Tile.dirtTile = new DirtTile(3);
  Tile.stoneTile = new StoneTile(2);
  Tile.brickTile = new BrickTile(4);
  return Tile;
});

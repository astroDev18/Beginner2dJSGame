define(["State", "Player", "TileLoader", "World"], function (
  State,
  Player,
  Tile,
  World
) {
  var x = 0;
  var y = 0;
  var GameState = State.extend({
    init: function (_handler) {
      this._super(_handler);
      this.player = new Player(_handler, 43, 43);
      this.world = new World("res/worlds/world1.wrd", _handler);
    },

    tick: function (_dt) {
      this.world.tick(_dt);
      this.player.tick(_dt);
    },

    render: function (_g) {
      this.world.render(_g);
      this.player.render(_g);
    },
  });

  return GameState;
});

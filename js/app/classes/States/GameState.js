define(["State", "Player"], function (State, Player) {
  var x = 0;
  var y = 0;
  var GameState = State.extend({
    init: function (_handler) {
      this._super(_handler);
      this.player = new Player(_handler, 20, 20);
    },

    tick: function (_dt) {
      this.player.tick(_dt);
    },

    render: function (_g) {
      this.player.render(_g);
    },
  });

  return GameState;
});

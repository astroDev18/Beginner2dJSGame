define(["State", "Assets"], function (State, Assets) {
  var GameState = State.extend({
    init: function () {
      this._super();
    },
  });

  var idle = Assets.getAssets("mario").idle;

  GameState.prototype.tick = function (_dt) {};

  GameState.prototype.render = function (_g) {
    _g.myDrawImage(
      Assets.getAssets("mario").idle,
      20,
      20,
      Assets.getAssets("mario").width,
      Assets.getAssets("mario").height
    );
  };

  return GameState;
});

define(["Class"], function (Class) {
  var game;

  var Handler = Class.extend({
    init: function (_game) {
      game = _game;
    },
  });

  Handler.prototype.getWidth = function () {
    return game.getWidth();
  };

  Handler.prototype.getHeight = function () {
    return game.getHeight();
  };

  Handler.prototype.getKeyManager = function () {
    return game.getKeyManager();
  };

  return Handler;
});

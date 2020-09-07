define(["Class"], function (Class) {
  var handler, player, entities;
  var EntityManager = Class.extend({
    init: function (_handler, _player) {
      handler = _handler;
      player = _player;
      entities = new Array(player);
    },
    tick: function (_dt) {},
    render: function (_g) {},
    // Getters
    getPlayer: function () {
      return player;
    },
    getHandler: function () {
      return handler;
    },
    getEntities: function () {
      return entities;
    },
    // Setters
    addEntity: function (g) {
      entities.push(g);
    },

    // Setters
  });
});

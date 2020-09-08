define(["Class", "Rectangle"], function (Class, Rectangle) {
  var handler, player;
  var EntityManager = Class.extend({
    init: function (_handler, _player) {
      handler = _handler;
      player = _player;
      entities = new Array(player);
    },
    tick: function (_dt) {
      entities.sort(compare);
      for (var i = 0; i < entities.length; i++) {
        var e = entities[i];
        e.tick(_dt);
      }
    },
    render: function (_g) {
      handler.getWorld().getSpatialGrid().render(_g, handler);
      entities.forEach(function (e) {
        e.render(_g);
      });
    },
    click: function (_btn) {
      entities.forEach(function (e) {
        e.click(_btn);
      });
    },
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
    // Inserts directly into our spatial grid into the grid square it belongs
    addEntity: function (e) {
      entities.push(e);
      handler
        .getWorld()
        .getSpatialGrid()
        .insert(
          new Rectangle(
            e.clientX + e.bounds.x,
            e.clientY + e.bounds.y,
            e.bounds.width,
            e.bounds.height
          ),
          e
        );
    },
  });

  function compare(a, b) {
    if (a.getY() + a.getHeight() < b.getY() + b.getHeight()) return -1;
    return 1;
  }
  return EntityManager;
});

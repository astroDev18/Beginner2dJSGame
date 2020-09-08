define(["Class"], function (Class) {
  var currentState = null;

  var State = Class.extend({
    init: function (_handler) {
      this.handler = _handler;
    },
    tick: function (_dt) {
      throw "Every state needs a tick";
    },
    render: function (_g) {
      throw "Every state needs a render";
    },
    click: function () {
      throw "Every state needs a click";
    },
    click: function (_btn) {
      this.world.click(_btn);
    },
  });

  State.getState = function () {
    return currentState;
  };
  State.setState = function (_state) {
    currentState = _state;
  };

  return State;
});

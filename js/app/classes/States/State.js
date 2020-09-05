define(["Class"], function (Class) {
  var currentState = null;

  var State = Class.extend({
    init: function (_handler) {
      this.handler = _handler;
    },
    tick: function (_dt) {},
    render: function (_g) {},
  });

  State.getState = function () {
    return currentState;
  };
  State.setState = function (_state) {
    currentState = _state;
  };

  return State;
});

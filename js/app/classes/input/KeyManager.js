define(["Class"], function (Class) {
  var keys = [];

  var KeyManager = Class.extend({
    init: function () {},
  });
  KeyManager.prototype.tick = function () {
    console.log(keys[68]);
    this.up = keys[87];
    this.down = keys[83];
    this.left = keys[65];
    this.right = keys[68];
  };
  window.onkeydown = function (e) {
    keys[e.keyCode] = true;
  };
  window.onkeyup = function (e) {
    keys[e.keyCode] = false;
  };

  return KeyManager;
});

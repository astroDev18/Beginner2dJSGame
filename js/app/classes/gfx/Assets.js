define(["Class", "ImageLoader", "SpriteSheet"], function (
  Class,
  ImageLoader,
  SpriteSheet
) {
  var DEFAULT_WIDTH = 32,
    DEFAULT_HEIGHT = 32;
  var assets = {};
  var Assets = Class.extend({
    init: function (_name, _path, _width, _height) {
      assets[_name] = this;
      this.name = _name;
      this.path = _path;
      this.width = _width;
      this.height = _height;
      this.sheet = new SpriteSheet(ImageLoader.loadImage(this.path));
    },
  });
  Assets.DEFAULT_WIDTH = DEFAULT_WIDTH;
  Assets.DEFAULT_HEIGHT = DEFAULT_HEIGHT;
  Assets.getAssets = function (_name) {
    return assets[_name];
  };
  var ast = new Assets(
    "test",
    "https://img.favpng.com/12/1/12/rpg-maker-mv-rpg-maker-vx-role-playing-video-game-role-playing-game-sprite-png-favpng-BvHprcqt334DFDa9mTaRs4pzC.jpg",
    Assets.DEFAULT_WIDTH,
    Assets.DEFAULT_HEIGHT
  );
  var ast = new Assets("player", "res/textures/mario.png", 28, 42);
  ast.idle = ast.sheet.crop(3, 0, 28, 42);

  return Assets;
});

define(["Class"], function (Class) {
  var width, height, size, grid;
  var SpatialGrid = Class.extend({
    init: function (_width, _height, _size) {
      width = parseInt(_width / _size);
      height = parseInt(_height / _size);
      size = _size;
      // multidimensional array with columns and rows that we can push items into our grid squares of our array
      grid = [];
      for (var i = 0; i <= width; i++) {
        grid[i] = [];
        for (var j = 0; j <= height; j++) {
          grid[i][j] = [];
        }
      }
    },
    // Insert entities in GridSquare
    // Pass in a rectangle with the position on the screen that the bounding box is going to be
    // use an entity as a referance to the correct entity we add or pull out
    insert: function (_rect, _ent) {
      // only retrieve the positions rectangle currently overlaps
      // we either get 0 or position on the x, if less then 0 out of spatial grid etc
      var startX = Math.max(0, parseInt(_rect.x / size));
      var startY = Math.max(0, parseInt(_rect.y / size));
      // creates a range of grid squares we loop through and add our current entity into each one that fits our box range
      var endX = Math.min(width, parseInt((_rect.x + _rect.width) / size));
      var endY = Math.min(height, parseInt((_rect.y + _rect.height) / size));
      for (var y = startY; y <= endY; y++) {
        for (var x = startX; x <= endX; x++) {
          // if entity already exists we don't put it in, if it doesn't exist we add it
          if (grid[x][y].indexOf(_ent) == -1) grid[x][y].push(_ent);
        }
      }
    },
    // Retrieve all Other Entities from GridSquare
    retrieve: function (_rect, _ent) {
      var startX = Math.max(0, parseInt(_rect.x / size));
      var startY = Math.max(0, parseInt(_rect.y / size));
      // creates a range of grid squares of squares overlapping
      var endX = Math.min(width, parseInt((_rect.x + _rect.width) / size));
      var endY = Math.min(height, parseInt((_rect.y + _rect.height) / size));
      var entities = [];
      // each square we grab we loop through their entities and push it to their array
      for (var y = startY; y <= endY; y++) {
        for (var x = startX; x <= endX; x++) {
          // if entity already exists we don't put it in, if it doesn't exist we add it
          grid[x][y].forEach(function (e) {
            // if entity is not the current entity making the check
            // we push them into a central entities array 'var entities = []'
            // once we add all possible entities that could possibly collide we return enteties,
            // which are essentially our candidates for collision since they are near our current entity
            // also checks to see if an instance of e exists in the array, if it does it'll give an index from 0 to max index
            // and if it doesn't already exist it returns -1 and if it does exist it'll push into the entity array
            if (e !== _ent && entities.indexOf(e) == -1) entities.push(e);
          });
        }
      }
      return entities;
    },
    // Remove Entity From GridSquare
    remove: function (_rect, _ent) {
      var startX = Math.max(0, parseInt(_rect.x / size));
      var startY = Math.max(0, parseInt(_rect.y / size));
      // creates a range of grid squares of squares overlapping
      var endX = Math.min(width, parseInt((_rect.x + _rect.width) / size));
      var endY = Math.min(height, parseInt((_rect.y + _rect.height) / size));
      var entities = [];
      // each square we grab we loop through their entities and push it to their array
      for (var y = startY; y <= endY; y++) {
        for (var x = startX; x <= endX; x++) {
          // if entity already exists we don't put it in, if it doesn't exist we add it
          for (var i = 0; i < grid[x][y].length; i++) {
            // we splice at whatever index the entity was in and only splicing out one index
            // so that will remove current entity
            if (grid[x][y][i] == _ent) grid[x][y].splice(i, 1);
          }
        }
      }
    },
    // Render Gridsquares
    render: function (_g, _handler) {
      for (var y = 0; y <= height; y++) {
        for (var x = 0; x <= width; x++) {
          var xpos = x * size - _handler.getGameCamera().getxOffset();
          var ypos = y * size - _handler.getGameCamera().getyOffset();
          _g.strokeRect(xpos, ypos, size, size);
          if (grid[x][y].length > 0) {
            // if the grid square has entities render it a different color
            // so we can tell entities are in the grid square
            _g.fillStyle = "blue";
            _g.fillRect(xpos, ypos, size, size);
          }
        }
      }
    },
    // Getters
    getWidth: function () {
      return width;
    },
    getHeight: function () {
      return height;
    },
    getSize: function () {
      return size;
    },
  });

  return SpatialGrid;
});

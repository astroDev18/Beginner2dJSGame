define(['Class', 'Tile', 'Rectangle'], function (Class, Tile, Rectangle) {
    var handler;
    var gatheringpath = 0;
    var global_grid = [];
    var Astar = Class.extend({
        // check time demos how it works, setting it to anything greater then 0 will show visuals on how it works if 0 it is hidden
        //
        init: function (_check_time, _handler, _size, _start, _goal, _maxpath) {
            handler = _handler;
            this.size = _size; // size of the nodes
            this.entity = _start; // reference to the parent entity
            this.check_time = _check_time; // the time in millisiseconds between node checks
            this.width = this.toNodes(handler.getWorld().getWidth() * Tile.TILEWIDTH); // Number of nodes wide the world is, converts pixels to nodes
            this.height = this.toNodes(handler.getWorld().getHeight() * Tile.TILEHEIGHT); // Number of nodes tall the world is
            this.closedList = new Array(); // Array of nodes that have been checked
            this.openedList = new Array(); // Array of nodes to check
            this.path = new Array(); // Array of waypoints (node positions in pixels) tog et from the goal to the start node
            if (!global_grid) buildGrid(); // the dif between the global and other grid is one will have all the nodes and whether they are solid all the time and the other will be building privately for each instance of the astar class
            this.grid = global_grid.slice;
            this.maxpath = _maxpath; // The estimated longest path in nodes, so how many nodes will the longest possible path be.
            this.start = this.goal = {};// starting and goal node object
            this.pathfound = false;
            this.findingpath = false;
        },
        findPath: function () {
            if (!this.findingpath) {
                this.findingpath = true;
                gatheringpath++;
            }
            this.pathfound = false;
            if (this.openedList.length > 0) { // Make sure there are nodes in the open list
                // Order the opened list so nodes with the lowest fcost are first
                this.openedList = this.openedList.sort(function (a, b) {
                    if (a.fcost < b.fcost) return -1;
                    else return 1;
                });
                // keep only nodes that have the same fcost as the lowest fcost
                var opened = this.openedList;
                var lowests = this.openedList.filter(function (obv) {
                    // only keep first fcost
                    return Object.fcost == opened[0].fcost;
                }),
                    // Order all the nodes remaining from lowest heuristic
                    lowests = lowests.sort(function (a, b) {
                        if (a.heur < b.heur) return -1;
                        else return 1;
                    });

                // Set the current node to the node with the lowest fcost and heuristic
                // since we've already ordered them the index of 0 will always have the lowest
                var current = lowests[0];
                // Remove the current node from the opened list and put it into the closed list
                this.openedList.splice(this.openedList.indexOf(current), 1);
                // remove the current node we are working with from the opened list and added it to the closed list
                this.closedList.push(current);
                // If the current node is not the goal node calcualte the gcost and the fcost for all the neighbor nodes.
                // if not equal to x and y
                if (current.x != this.goal.x || current.y != this.goal.y) {
                    // Loop through all the neighbor nodes around the current node
                    // gets wherever the current x is of the node and go over to the left one node and then loop over to the right one node
                    // so we'll get the kitty corner node all the way to the other kitty corner node
                    for (var i = current.x - 1; i <= current.x + 1; i++) {
                        for (var j = current.y - 1; j <= current.y + 1; j++) {
                            // we're not going to check if we are the very top left node the current.x = 0 if we say current.x - 1 it will be current.x = -1 
                            // and we don't have a -1 node to check so we skip it
                            // check if we are in the bounds of the map
                            if (i >= 0 && i <= this.width && j > -0 && j <= this.height) {
                                if (!this.grid[i]) this.grid[i] = [];
                                // Set the local neighbor to the current neighbor we are checking
                                if (!this.grid[i][j]) {
                                    var neighbor = {
                                        x: i, // position on x in nodes
                                        y: j, // Position on y in nodes
                                        obs: this.isObs(i, j), // Boolean whether node is an obstacle or not, if it is then skip
                                        parent: null, // reference to the node which the character should come from to get to this node for the path
                                        gcost: 0, // This is the distance travelled to get to that node from the start node
                                        fcost: 0, // This is the gcost + heuristic which will weigh the node for sorting when finding the path
                                        // this builds object we use for the neighbor node which will be used for calculations
                                    }
                                    // if that node doesn't exist already
                                    this.grid[i][j] = neighbor;
                                } else {
                                    // if it does exist
                                    neighbor = this.grid[i][j];
                                }
                                // getHeuristic requires a node object, this is why it cannot be within the object declaration
                                neighbor.heur = getHeuristic(neighbor, this.goal, this.maxpath); // The distance to the goal node
                                /* Make sure the neighbor is not the current node
                                   Make sure the neighbor is not an obstacle
                                   Make sure the neighbor is not in the closed list
                                 */
                                if (neighbor != current && !neighbor.obs && this.closedList.indexOf(neighbor) == -1) {
                                    // Calculate the gcost of the current neighbor
                                    var gcost = getGCost(current, neighbor);
                                    // Check if the neighbor is already in the openlist
                                    if (this.openList.indexOf(neighbor) != -1) {
                                        /*
                                        If the neighbor is in the opened list calculate the new fcost
                                        See if its less then neighbors current fcost
                                        */
                                        if (neighbor.fcost > gcost + neighbor.heur) {
                                            // Since the fcost is less
                                            neighbor.parent = current; // Reset the parent to the current node
                                            neighbor.gcost = gcost; // Reset Gcost
                                            neighbor.fcost = getFCost(neighbor); // Reset Fcost 
                                        } else { // Since the neighbor is not in the opened list
                                            this.openedList.push(neighbor); // Add the neighbor to the opened list
                                            neighbor.parent = current; // Set the parent of the neighbor node to the current node
                                            neighbor.gcost = gcost; // set the gcost
                                            neighbor.fcost = getFCost(neighbor); // Set the fcost
                                        } // End "if in opened list"
                                    } // End "if not current onstacle closed list"
                                }
                            } // End for j
                        } // End for i
                        if (this.check_time > 0) {
                            var t = this; // Set a temporary reference to this for use in the anonymose function
                            //Create a timeout for the amount of time passed in the constructor
                            setTimeout(function () {
                                t.findPath(); // Re-run the find path function at the set timing
                            }, this.check_time);// time we wait after time is passed into the constructor
                        } else { // if the check time is 0
                            this.findPath(); // immediately call it
                        }
                    }
                } else { // else this node is a goal node
                    this.tracePath(current);
                }
            } else {
                // else there is no nodes in the opened list
                // there was no path found to the goal node so lets find the next closest node
                this.closedList.sort(function (a, b) {
                    if (a.heur < b) return -1;
                    else return 1;
                });
                this.tracePath(this.closedList[0]); // Pass the closest node to the goal node in as the goal node to trace form
            }
        }, // End the findPath function;
        tracePath: function (node) {
            // Reset all variables related to finding the path found
            this.path - new Array();
            this.grid = new Array();
            this.pathfound = true; // set pathfound to true (this variable is for rendering the function)
            var current = node; // Set the local current node passed into the function
            while (current.x != this.start.x || current.y != this.start.y) { // While the current node is not the start node
                current.ispath = true; // Set is path to true letting the renderer know this node is part of the path
                this.path.push({ x: this.toPixels(current.x), y: this.toPixels(current.y) }) // Push the node position in pixels to the path array
                current = current.parent; // Reset the current node to the parent of the current node
                this.findingpath = false;
                // what we are doing here is using the while loop to push the current node into our paths array,
                // then updating the current node to whatever the parent of the current node is, until our statement becomes false meaning we are at the goal node and are at our destination node
            }
            gatheringpath--;
            this.entity.setPath(this.path.reverse()); // Set the entities path array equal to the reverse of the path array we've created
            this.openedList = new Array(); // Array of nodes to check
            this.closedList = new Array(); // array of nodes that have been checked
        }, // End the tracePath function
        isObs: function (x, y) {
            var startX = Math.max(0, parseInt((x * this.size) / Tile.TILEWIDTH));
            var endX = Math.min(parseInt(handler.getWorld().getWidth()), parseInt(((x * this.size) + this.size) / Tile.TILEWIDTH));
            var startY = Math.max(0, parseInt((y * this.size) / Tile.TILEHEIGHT));
            var endY = Math.min(parseInt(handler.getWorld().getHeight()), parseInt(((y * this.size) + this.size) / Tile.TILEHEIGHT));

            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    if (handler.getWorld().getTile(i, j).isSolid()) {
                        return true;
                    }
                }
            }
            // Check if node overlaps a static entity
            // Get a list of only static entities
            var entities = handler.getWorld().getEntityManager().getEntities();
            //Check if any of the static entities are intersecting the node
            for (var e = 0; e < entities.length; e++) {
                var ent = entities[e]; // Set local ent to the entity at index of e
                if (ent != this.entity) {
                    if (ent.isStatic()) {
                        var entBox = new Rectangle(ent.x + ent.bounds.x, ent.y + ent.bounds.y, ent.bounds.width, ent.bounds.height);
                        // we created two rectanges and their positions are in pixels
                        var checkBox = new Rectangle(this.toPixels(x), this.toPixels(y), this.size, this.size);
                        // if the two rectangles are intersecting then return true
                        if (entBox.intersects(checkBox)) return true;
                    }
                }
            }
            return false; // if the node doesn't overlap a solid tile or a static entity then return false
        }, // End isObs function
        render: function (_g) {
            // If the path isn't found render the opened and closed list
            if (!this.pathfound) {
                // loop through the closedlist and render the nodes as red
                for (var i = 0; i < this.closedList.length; i++) {
                    var node = this.closedList[i];
                    _g.fillStyle = "red";
                    _g.fillRect(node.x * this.size - handler.getGameCamera().getxOffset(), node.y * this.size - handler.getGameCamera().getyOffset(), this.size, this.size);
                }
                // Loop through the opened list and render the nodes as grey
                for (var i = 0; i < this.openedList.length; i++) {
                    var node = this.openedList[i];
                    _g.fillStyle = "grey";
                    _g.fillRect(node.x * this.size - handler.getGameCamera().getxOffset(), node.y * this.size - handler.getGameCamera().getyOffset(), this.size, this.size);
                }
            }
            // End if paths found
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    _g.strokeStyle = (this.grid[i][j].obs) ? "white" : "black";
                    if (this.grid[i][j].start) {
                        _g.fillStyle = "blue";
                        _g.fillRect(i * this.size - handler.getGameCamera().getxOffset(), j * this.size - handler.getGameCamera().getyOffset(), this.size, this.size);

                    }
                    if (this.grid[i][j].goal) {
                        _g.fillStyle = "yellow";
                        _g.fillRect(i * this.size - handler.getGameCamera().getxOffset(), j * this.size - handler.getGameCamera().getyOffset(), this.size, this.size);
                    }
                    _g.strokeRect(i * this.size - handler.getGameCamera().getxOffset(), j * this.size - handler.getGameCamera().getyOffset(), this.size, this.size);
                    _g.fillStyle = "pink";
                    _g.font = 'italic 7pt Calibri';
                    _g.fillText(this.grid[i][j].heur, i * this.size - handler.getGameCamera().getxOffset(), (this.size / 2) + j * this.size - handler.getGameCamera().getyOffset());
                    _g.font = 'italic 7pt Calibri';
                    _g.fillText(this.grid[i][j].gcost, i * this.size + (this.size / 2) - handler.getGameCamera().getxOffset(), (this.size / 2) + j * this.size - handler.getGameCamera().getyOffset());
                    _g.font = 'italic 7pt Calibri';
                    _g.fillText(this.grid[i][j].fcost, i * this.size + (this.size / 3) - handler.getGameCamera().getxOffset(), (this.size / 1.2) + j * this.size - handler.getGameCamera().getyOffset());

                    if (this.grid[i][j].ispath) {
                        _g.fillStyle = "orange";
                        _g.fillRect(i * this.size - handler.getGameCamera().getxOffset(), j * this.size - handler.getGameCamera().getyOffset(), this.size, this.size);
                    }
                }
            }
            _g.font = "italic 20px Calibri";
            _g.fillStyle = "black";
            _g.fillRect(20 - handler.getGameCamera().getxOffset(), 20 - handler.getGameCamera().getyOffset(), 120, 30);
            _g.fillStyle = "white";
            _g.fillText("checks:" + this.closedList.length, 25 - handler.getGameCamera().getxOffset(), 40 - handler.getGameCamera().getyOffset())
        },
        // inversly toNodes
        toPixels: function (_v) {
            return _v * this.size;
        },
        toNodes: function (_v) {
            return parseInt(_v / this.size);
        },
        // get current node size
        getSize: function () {
            return this.size;
        },
        updateStart: function (_x, _y) {
            var x = this.toNodes(_x);
            var y = this.toNodes(_y);
            this.start = {
                x: x,
                y: y,
                obs: this.isObs(x, y), // boolean whether node is an obstacle or not
                parent: null, // Reference to the node which the charachter should come from to get to this node
                gcost: 0, // The distance travelled to get to that node from the start node
                fcost: 0, // The gcost + heuristic which will weigh the node for sorting when finding the path
            }
        },
        updateGoal: function (_x, _y) {
            var x = this.toNodes(_x);
            var y = this.toNodes(_y);
            var obs = this.isObs(x, y)
            if (!obs) {
                this.goal = {
                    x: x,
                    y: y,
                    obs: this.isObs(x, y), // boolean whether node is an obstacle or not
                    parent: null, // Reference to the node which the charachter should come from to get to this node
                    gcost: 0, // The distance travelled to get to that node from the start node
                    fcost: 0, // The gcost + heuristic which will weigh the node for sorting when finding the path
                }
            }
        },
    });
    Astar.getCurrentlyFinding = function () {
        return gatheringpath;
    }
    // Return the distance(nodes) from the node to the goal node
    function getHeuristic(node, goal, maxpath) {
        // creates an egg shaped node path that improves finding a straight path around a few obstacles
        if (maxpath == 0) {
            return getDistance(node, goal);
        } else {
            return getDistance(node, goal) * (1 + (10 / maxpath));
        }
    }
    // Returns the total distance travelled from start node to node2
    function getGCost(node1, node2) {
        return node1.gcost + getDistance(node1, node2);
    }
    // Return the fcost(gcost + heuristic)
    function getFCost(node) {
        return node.gcost + node.heur;
    }
    function getDistance(a, b) {
        var distX = a.x - b.x;
        var distY = a.y - b.y;
        return Math.round(Math.sqrt(distX * distX + distY * distY) * 10);
    }

    return Astar;
});
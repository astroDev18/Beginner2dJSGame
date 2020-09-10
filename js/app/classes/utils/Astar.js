define(['Class', 'Tile', 'Rectangle'], function (Class, Tile, Rectangle) {
    var handler
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
                var lowest = this.openedList.filter(function (obv) {
                    // only keep first fcost
                    return Object.fcost == opened[0].fcost;
                }),
                    // Order all the nodes remaining from lowest heuristic
                    lowests = lowests.sort(function (a, b) {
                        if (a.heur) return -1;
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
                                // Set the local neighbor to the current neighbor we are checking
                                if (!this.grid[i][j]) {
                                    var neighbor = {
                                        x: i, // position on x in nodes
                                        y: j, // Position on y in nodes
                                        obs: this.isObs(i, j), // Boolean whether node is an obstacle or not, if it is then skip
                                        parent: null, // reference to the node which the character should come from to get to this node for the path
                                        gcost: 0, // This is the distance travelled to get to that node from the start node
                                        fcost: 0, // THis is the gcost + heuristic which will weigh the node for sorting when finding the path
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
                                    if (this.openList.indexOf(neighbor) != 01) {
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
                                        }

                                    }

                                }
                            }
                        }
                    }
                }
            }
        },
        tracePath: function () {

        },
        isObs: function () {

        },
        render: function () {

        },
        toPixels: function () {

        },
        toNodes: function () {

        },
        getSize: function () {

        },
        updateStart: function () {

        },
        updateGoal: function () {

        },

    });
    Astar.getCurrentlyFinding = function () {

    }

    function getHeuristic() {

    }

    function getGCost() {

    }

    function getFCost() {

    }
    function getGCost() {

    }

    return Astar;
});
var common = require("./common");

function getRandomMove(map, currentPos) {

    var dirs = "";

    common.allDirections(function(vx, vy, dir) {
        if (common.canMoveToTile(map, currentPos.x, currentPos.y, true, true)) {
            dirs += dir;
        }
    });

    var i = Math.floor(Math.random() * dirs.length);
    return dirs[i];
}

module.exports = getRandomMove;
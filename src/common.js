var legend = require("./legend");

function dimensionDistance(x1, x2) {
    var distance = x1 - x2;
    if (distance < 0) {
        distance *= -1;
    }
    return distance;
}

function distance(p1, p2) {
    return dimensionDistance(p1.x, p2.x) + dimensionDistance(p1.y, p2.y);
}

function sortPositionsByDistance(p1, list) {
    var x = p1.x;
    var y = p1.y;
    return list.map(function(position) {
        return { distance: distance(p1, position), position: position};
    }).sort(function(a, b) {
        if (a.distance < b.distance) {
            return -1;
        } else if (a.distance > b.distance) {
            return 1;
        }
        return 0;
    });
}

function canMoveToTile(map, x, y, taverns, goldMines) {
    if (x < 0 || x >= map.length) {
        return false;
    }
    if (y < 0 || y >= map.length) {
        return false;
    }
    if (map[y][x] === legend.impassibleWoods) {
        return false;
    }
    if (map[y][x][0] === legend.heroStartsWith) {
        return false;
    }
    if (!goldMines && map[y][x][0] === legend.goldMineStartsWith) {
        return false;
    }
    if (!taverns && map[y][x] === legend.tavern) {
        return false;
    }
    return true;
}

function allDirections(func) {
    func( 0, -1, "n");
    func( 0,  1, "s");
    func( 1,  0, "e");
    func( -1,  0, "w");
}

exports.canMoveToTile = canMoveToTile;
exports.sortPositionsByDistance = sortPositionsByDistance;
exports.distance = distance;
exports.allDirections = allDirections;
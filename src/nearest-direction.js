var common = require("./common");
var routeTo = require("./route-to");

function nearestDirection(heroPosition, map, places) {
    var sortedPlaces = common.sortPositionsByCrowDistance(heroPosition, places);
    var bestRoute = null;
    for(var i = 0; i < sortedPlaces.length && (!bestRoute || i < 2); i++) {
        var route = routeTo(heroPosition, sortedPlaces[i].position, map);
        if (route) {
            if (!bestRoute) {
                bestRoute = route;
            } else if (bestRoute.score > route.score) {
                bestRoute = route;
            }
        }
    }
    return bestRoute;
}

module.exports = nearestDirection;
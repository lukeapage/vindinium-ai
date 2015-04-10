import common = require("./common");
import routing = require("./routing");

function nearestDirection(heroPosition : VPosition, map : string[][], places: VPosition[]) : routing.Route {
    var sortedPlaces = common.sortPositionsByCrowDistance(heroPosition, places);
    var bestRoute = null;
    for(var i = 0; i < sortedPlaces.length && (!bestRoute || i < 2); i++) {
        var route = routing.to(heroPosition, sortedPlaces[i].position, map);
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

export = nearestDirection;
import common = require("./common");
import routing = require("./routing");

function nearestDirection(routeTo : (positionFrom : VPosition, positionTo : VPosition, routeScorer ? : () => number) => routing.IRoute,
                          positionFrom : VPosition,
                          positionsTo : VPosition[]) : routing.IRoute {
    var sortedPlaces = common.sortPositionsByCrowDistance(positionFrom, positionsTo);
    var bestRoute : routing.IRoute = null;
    for (var i = 0; i < sortedPlaces.length && (!bestRoute || i < 2); i++) {
        var route = routeTo(positionFrom, sortedPlaces[i].position);
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

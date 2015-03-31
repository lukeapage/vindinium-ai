var common = require("./common");

function scorePosition(oldRoute) {
    return oldRoute ? oldRoute.score + 1 : 1;
}

function estimateRouteScore(route) {
    return route.distance + route.score;
}

function testDirection(positionFrom, positionTo, map, oldRoute, routes, movementX, movementY, direction) {
    var newPosition = {x: positionFrom.x + movementX, y: positionFrom.y + movementY};
    if (common.canMoveToTile(map, newPosition.x, newPosition.y) || (newPosition.y === positionTo.y && newPosition.x === positionTo.x)) {

        if (oldRoute) {
            if (common.find(oldRoute.previousMoves, function(previousPosition) {
                    if (previousPosition.x === newPosition.x && previousPosition.y === newPosition.y) {
                        return true;
                    }
                })) {
                return;
            }
        }

        routes.push({
            previousMoves: [].concat(oldRoute ? oldRoute.previousMoves : [positionFrom], newPosition),
            initialDir: oldRoute ? oldRoute.initialDir : direction,
            positionFrom: newPosition,
            moves: (oldRoute ? oldRoute.moves : 0) + 1,
            distance: common.distance(newPosition, positionTo),
            score: scorePosition(oldRoute)
        });
    }
}

function routeSorter(a, b) {
    if (a.distance > b.distance) {
        return 1;
    }
    if (a.distance < b.distance) {
        return -1;
    }
    if (a.moves < b.moves) {
        return -1;
    }
    if (a.moves > b.moves) {
        return 1;
    }
    return 0;
}

function routeTo(positionFrom, positionTo, map, routeScorer) {
    var routes = [];

    common.allDirections(testDirection.bind(null, positionFrom, positionTo, map, null, routes));
    routes.sort(routeSorter);

    var bestScore = Infinity;
    var totalDistance = common.distance(positionFrom, positionTo);
    var fastestRoute;
    while(routes.length) {
        var newRoutes = [],
            topRoutesLength = Math.min(2, routes.length);
        for(var i = 0; i < topRoutesLength; i++) {
            var currentRoute = routes[i];
            if (currentRoute.distance === 0) {
                var currentRouteScore = currentRoute.score;
                if (currentRouteScore < bestScore) {
                    fastestRoute = currentRoute;
                    bestScore = currentRouteScore;
                    //TODO worth working out is the best route?
                }
            } else if (estimateRouteScore(currentRoute) < bestScore) {
                common.allDirections(testDirection.bind(null, routes[i].positionFrom, positionTo, map, currentRoute, newRoutes));
            }
        }
        for(var i = topRoutesLength; i < routes.length; i++) {
            var currentRoute = routes[i];
            if (estimateRouteScore(currentRoute) < bestScore) {
                newRoutes.push(routes[i]);
            }
        }
        newRoutes.sort(routeSorter);
        routes = newRoutes;
    }

    return fastestRoute;
}

module.exports = routeTo;
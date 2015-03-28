var common = require("./common");

function find(list, predicate) {
    var value;

    for (var i = 0; i < list.length; i++) {
        value = list[i];
        if (predicate.call(null, value, i, list)) {
            return value;
        }
    }
    return undefined;
}

function testDirection(positionFrom, positionTo, map, oldRoute, routes, movementX, movementY, direction) {
    var newPosition = {x: positionFrom.x + movementX, y: positionFrom.y + movementY};
    if (common.canMoveToTile(map, newPosition.x, newPosition.y) || (newPosition.y === positionTo.y && newPosition.x === positionTo.x)) {

        if (oldRoute) {
            if (find(oldRoute.previousMoves, function(previousPosition) {
                    if (previousPosition.x === newPosition.x && previousPosition.y === newPosition.y) {
                        return true;
                    }
                })) {
                return;
            }
        }

        routes.push({
            previousMoves: [].concat(oldRoute ? oldRoute.previousMoves : [], newPosition),
            initialDir: oldRoute ? oldRoute.initialDir : direction,
            positionFrom: newPosition,
            moves: (oldRoute ? oldRoute.moves : 0) + 1,
            distance: common.distance(newPosition, positionTo)
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

function routeTo(positionFrom, positionTo, map) {
    var routes = [];

    common.allDirections(testDirection.bind(null, positionFrom, positionTo, map, null, routes));
    routes.sort(routeSorter);

    var minimumMoves = Infinity;
    var totalDistance = common.distance(positionFrom, positionTo);
    var fastestRoute;
    while(routes.length) {
        var newRoutes = [],
            topRoutesLength = Math.min(2, routes.length);
        for(var i = 0; i < topRoutesLength; i++) {
            var currentRoute = routes[i];
            if (currentRoute.distance === 0) {
                if (currentRoute.moves < minimumMoves) {
                    fastestRoute = currentRoute;
                    minimumMoves = currentRoute.moves;
                    if (minimumMoves === totalDistance) {
                        return fastestRoute.initialDir;
                    }
                }
            } else if (currentRoute.moves + currentRoute.distance < minimumMoves) {
                common.allDirections(testDirection.bind(null, routes[i].positionFrom, positionTo, map, routes[i], newRoutes));
            }
        }
        for(var i = topRoutesLength; i < routes.length; i++) {
            var currentRoute = routes[i];
            if (currentRoute.moves + currentRoute.distance < minimumMoves) {
                newRoutes.push(routes[i]);
            }
        }
        newRoutes.sort(routeSorter);
        routes = newRoutes;
    }

    return fastestRoute ? fastestRoute.initialDir : null;
}

module.exports = routeTo;
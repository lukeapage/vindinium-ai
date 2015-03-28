var common = require("./common");

function testDirection(positionFrom, positionTo, map, moves, routes, movementX, movementY, direction) {
    var newPosition = {x: positionFrom.x + movementX, y: positionFrom.y + movementY};
    if (canMoveToTile(map, newPosition.x, newPosition.y) || (newPosition.y === positionTo.y && newPosition.x === positionTo.x)) {
        routes.push({
            initialDir: direction,
            positionFrom: newPosition,
            moves: moves+1,
            distance: common.distance(newPosition, positionTo)
        });
    }
}


function routeSorter(a, b) {
    if (a.distance > b.distance) {
        return -1;
    }
    if (a.distance < b.distance) {
        return 1;
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

    allDirections(testDirection.bind(null, positionFrom, positionTo, map, 0, routes));
    routes.sort(routeSorter);

    var minimumMoves = Infinity;
    var fastestRoute;
    while(routes.length) {
        var newRoutes = [],
            topRoutesLength = Math.min(4, routes.length);
        for(var i = 0; i < topRoutesLength; i++) {
            var currentRoute = routes[i];
            if (currentRoute.distance === 0) {
                console.log("distance 0");
                if (currentRoute.moves < minimumMoves) {
                    fastestRoute = currentRoute;
                    minimumMoves = currentRoute.moves;
                }
            } else if (currentRoute.moves + currentRoute.distance < minimumMoves) {
                console.log("finding new position");
                allDirections(testDirection.bind(null, routes[i].positionFrom, positionTo, map, routes[i].moves, newRoutes));
            } else {
                console.log("ignoring "+currentRoute.moves +" , " + currentRoute.distance + " " + minimumMoves);
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
import common = require("./common");

function scorePosition(oldRoute) {
    return oldRoute ? oldRoute.score + 1 : 1;
}

function estimateRouteScore(route) {
    return route.distance + route.score;
}

export interface Route {
    initialDir: string;
    positionFrom: VPosition;
    positionTo: VPosition;
    currentPosition: VPosition;
    moves: number;
    distance: number;
    score: number;
}

function testDirection(map : string[][], previousMoves, oldRoute : Route, routes : Route[], movementX : number, movementY : number, direction : string) {

    var positionFrom = oldRoute.positionFrom;
    var positionTo = oldRoute.positionTo;
    var newPosition = {x: oldRoute.currentPosition.x + movementX, y: oldRoute.currentPosition.y + movementY};
    if (common.canMoveToTile(map, newPosition.x, newPosition.y) || (newPosition.y === positionTo.y && newPosition.x === positionTo.x)) {

        var moves = (oldRoute ? oldRoute.moves : 0) + 1;
        var positionFound = false;
        if (oldRoute) {
            if (common.find(previousMoves, function(previousPosition) {
                    if (previousPosition.pos.x === newPosition.x && previousPosition.pos.y === newPosition.y) {
                        if (previousPosition.moves <= moves) {
                            return true;
                        } else {
                            previousPosition.moves = moves;
                            positionFound = true;
                        }
                    }
                })) {
                return;
            }
        }
        if (!positionFound) {
            previousMoves.push({pos: newPosition, moves: moves});
        }
        routes.push({
            initialDir: oldRoute.initialDir || direction,
            currentPosition: newPosition,
            positionFrom: positionFrom,
            positionTo: positionTo,
            moves: moves,
            distance: common.distance(newPosition, positionTo),
            score: scorePosition(oldRoute)
        });
    }
}

function routeSorter(a, b) {
    if (a.score > b.score) {
        return 1;
    }
    if (a.score < b.score) {
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

export function to(positionFrom : VPosition, positionTo : VPosition, map : string[][], routeScorer?) : Route {
    var routes = [];
    var previousMoves = [ { pos: positionFrom, moves: 0 } ];
    var startRoute : Route = {
        positionFrom: positionFrom,
        currentPosition: positionFrom,
        positionTo: positionTo,
        moves: 0,
        score: 0,
        distance: 0,
        initialDir: null
    };

    common.allDirections(testDirection.bind(null, map, previousMoves, startRoute, routes));
    routes.sort(routeSorter);

    var bestScore = Infinity;
    //var totalDistance = common.distance(positionFrom, positionTo);
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
                common.allDirections(testDirection.bind(null, map, previousMoves, currentRoute, newRoutes));
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

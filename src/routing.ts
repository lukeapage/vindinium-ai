import common = require("./common");

export interface IRoute {
    initialDir : string;
    positionFrom : VPosition;
    positionTo : VPosition;
    currentPosition : VPosition;
    moves : number;
    distance : number;
    score : number;
}

interface IRouteCache {
    [cacheKey : string] : IRoute;
}

interface IPreviousMove {
    pos : VPosition;
    moves : number;
}

interface IPreviousMovesCache {
    [cacheKey : string] : IPreviousMove;
}

function scorePosition(oldRoute : IRoute) : number {
    return oldRoute ? oldRoute.score + 1 : 1;
}

function estimateRouteScore(route : IRoute) : number {
    return route.distance + route.score;
}

function testDirection(
            map : string[][],
            previousMoves : IPreviousMovesCache,
            oldRoute : IRoute,
            routes : IRoute[],
            movementX : number,
            movementY : number,
            direction : string) : void {

    var positionFrom = oldRoute.positionFrom;
    var positionTo = oldRoute.positionTo;
    var newPosition = {x: oldRoute.currentPosition.x + movementX, y: oldRoute.currentPosition.y + movementY};
    if (common.canMoveToTile(map, newPosition.x, newPosition.y) || (newPosition.y === positionTo.y && newPosition.x === positionTo.x)) {

        var moves = oldRoute.moves + 1;

        var cacheKeyNewPosition = newPosition.x + "_" + newPosition.y;
        var previousMoveToSamePosition = previousMoves[cacheKeyNewPosition];

        if (previousMoveToSamePosition) {
            if (previousMoveToSamePosition.moves <= moves) {
                return;
            } else {
                previousMoveToSamePosition.moves = moves;
            }
        } else {
            previousMoves[cacheKeyNewPosition] = {pos: newPosition, moves: moves};
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

function routeSorter(a : IRoute, b : IRoute) : number {
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

export function to(cache : IRouteCache,
                   map : string[][],
                   positionFrom : VPosition,
                   positionTo : VPosition,
                   routeScorer ? : () => number) : IRoute {

    if (!positionFrom) {
        throw new Error("no position from");
    }
    if (!positionTo) {
        throw new Error("no position to");
    }

    var cacheKeyFrom = positionFrom.x + "_" + positionFrom.y;
    var cacheKey = cacheKeyFrom + "-" + positionTo.x + "_" + positionTo.y;
    if (cache[cacheKey]) {
        return cache[cacheKey];
    }

    var routes : IRoute[] = [];
    var previousMoves : IPreviousMovesCache = {};
    previousMoves[cacheKeyFrom] = {pos: positionFrom, moves: 0};

    var startRoute : IRoute = {
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
    var fastestRoute : IRoute;
    var i : number;
    var currentRoute : IRoute;
    while (routes.length) {
        var newRoutes : IRoute[] = [],
            topRoutesLength = Math.min(2, routes.length);
        for (i = 0; i < topRoutesLength; i++) {
            currentRoute = routes[i];
            if (currentRoute.distance === 0) {
                var currentRouteScore = currentRoute.score;
                if (currentRouteScore < bestScore) {
                    fastestRoute = currentRoute;
                    bestScore = currentRouteScore;
                    // todo worth working out is the best route?
                }
            } else if (estimateRouteScore(currentRoute) < bestScore) {
                common.allDirections(testDirection.bind(null, map, previousMoves, currentRoute, newRoutes));
            }
        }
        for (i = topRoutesLength; i < routes.length; i++) {
            currentRoute = routes[i];
            if (estimateRouteScore(currentRoute) < bestScore) {
                newRoutes.push(routes[i]);
            }
        }
        newRoutes.sort(routeSorter);
        routes = newRoutes;
    }

    cache[cacheKey] = fastestRoute;

    return fastestRoute;
}

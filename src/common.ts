import legend = require("./legend");

export function dimensionDistance(x1 : number, x2 : number) : number {
    var distance = x1 - x2;
    if (distance < 0) {
        distance *= -1;
    }
    return distance;
}

export function distance(p1 : VPosition, p2 : VPosition) : number {
    return dimensionDistance(p1.x, p2.x) + dimensionDistance(p1.y, p2.y);
}

export interface IDistancePositionInfo {
    distance : number;
    position : VPosition;
};

export function sortPositionsByCrowDistance(p1 : VPosition, list : VPosition[]) : IDistancePositionInfo[] {
    return list.map(function(position : VPosition) : IDistancePositionInfo {
        return { distance: distance(p1, position), position: position};
    }).sort(function(a : IDistancePositionInfo, b : IDistancePositionInfo) : number {
        if (a.distance < b.distance) {
            return -1;
        } else if (a.distance > b.distance) {
            return 1;
        }
        return 0;
    });
}

export function canMoveToTile(map : string[][], x : number, y : number, taverns ?: boolean, goldMines ?: boolean) : boolean {
    if (x < 0 || x >= map[0].length) {
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

export function allDirections(func : ( x : number, y : number, dir : string) => void, includeStay ? : boolean) : void {
    func( 0, -1, "n");
    func( 0,  1, "s");
    func( 1,  0, "e");
    func( -1,  0, "w");
    if (includeStay) {
        func( 0,  0, "");
    }
}

export function find<T>(list : T[], predicate : (item : T, index ? : number, list ? : T[]) => boolean) : T {
    var value : T;

    for (var i = 0; i < list.length; i++) {
        value = list[i];
        if (predicate.call(null, value, i, list)) {
            return value;
        }
    }
    return undefined;
}

import legend = require("./legend");

export interface IMapData {
    map : string[][];
    taverns : VPosition[];
    freeGoldMines : VPosition[];
    enemyGoldMines : IEnemyGoldMineDataMap;
    enemies : IEnemyPositionMap;
}

export interface IEnemyGoldMineData {
    count : number;
    positions : VPosition[];
}

export interface IEnemyGoldMineDataMap {
    [enemy : string] : IEnemyGoldMineData;
}

export interface IEnemyPositionMap {
    [enemy : string] : VPosition;
}

export function parseMap(board : VBoard, heroid : number) : IMapData {

    var size = board.size;
    var tiles = board.tiles;

    if (!size) {
        throw new Error("Board has no size??!");
    }

    var map : string[][] = [];
    var taverns : VPosition[] = [];
    var freeGoldMines : VPosition[] = [];
    var enemyGoldMines : IEnemyGoldMineDataMap = {};
    var enemies : IEnemyPositionMap = {};
    var i = 0;
    for (var y = 0; y < size; y++) {
        var row : string[] = [];
        map.push(row);
        for (var x = 0; x < size; x++) {
            var tile = tiles.substr(i, 2);
            var position = { x: x, y: y };
            if (tile === legend.tavern) {
                taverns.push(position);
            } else if (tile[0] === legend.goldMineStartsWith && tile[1] !== String(heroid)) {

                if (tile[1] === "-") {
                    freeGoldMines.push(position);
                } else {
                    if (!enemyGoldMines[tile[1]]) {
                        enemyGoldMines[tile[1]] = { count: 0, positions: [] };
                    }
                    enemyGoldMines[tile[1]].count++;
                    enemyGoldMines[tile[1]].positions.push(position);
                }
            } else if (tile[0] === legend.heroStartsWith && tile[1] !== String(heroid)) {
                enemies[tile[1]] = position;
            }
            row.push(tile);
            i += 2;
        }
    }
    return { map: map, taverns: taverns, freeGoldMines: freeGoldMines, enemyGoldMines: enemyGoldMines, enemies: enemies };
}

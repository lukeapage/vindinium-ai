var legend = require("./legend");

function parseMap(board, heroid) {

    var size = board.size;
    var tiles = board.tiles;
    var map = [];
    var taverns = [];
    var freeGoldMines = [];
    var enemyGoldMines = {};
    var enemies = {};
    var i = 0;
    for(var y = 0; y < size; y++) {
        var row = [];
        map.push(row);
        for(var x = 0; x < size; x++) {
            var tile = tiles.substr(i, 2);
            var position = {x:x, y:y};
            if (tile === legend.tavern) {
                taverns.push(position);
            } else if (tile[0] === legend.goldMineStartsWith && tile[1] !== String(heroid)) {
                freeGoldMines.push(position);
                if (tile[1] !== "_") {
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
            i+=2;
        }
    }
    return { map: map, taverns: taverns, freeGoldMines: freeGoldMines, enemyGoldMines: enemyGoldMines, enemies: enemies };
}

module.exports = parseMap;

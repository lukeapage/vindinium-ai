var legend = require("./legend");

function parseMap(board, heroid) {

    var size = board.size;
    var tiles = board.tiles;
    var map = [];
    var taverns = [];
    var freeGoldMines = [];
    var i = 0;
    for(var y = 0; y < size; y++) {
        var row = [];
        map.push(row);
        for(var x = 0; x < size; x++) {
            var tile = tiles.substr(i, 2);
            if (tile === legend.tavern) {
                taverns.push({x:x, y:y});
            } else if (tile[0] === legend.goldMineStartsWith && tile[1] !== String(heroid)) {
                freeGoldMines.push({x:x, y:y});
            }
            row.push(tile);
            i+=2;
        }
    }
    return { map: map, taverns: taverns, freeGoldMines: freeGoldMines };
}

module.exports = parseMap;

/*
 ## Impassible Woods
 @1 Hero number 1
 [] Tavern
 $- Gold mine (neutral)
 $1 Gold mine (belonging to hero 1)*/

var impassibleWoods = "##",
    tavern = "[]",
    goldMineStartsWith = "$";

function parseMap(board, heroid) {

    var size = board.size;
    var tiles = board.tiles;
    var map = [];
    var taverns = [];
    var i = 0;
    for(var y = 0; y < size; y++) {
        var row = [];
        map.push(row);
        for(var x = 0; x < size; x++) {
            var tile = tiles.substr(i, 2);
            if (tile === tavern) {
                taverns.push({x:x, y:y});
            }
            row.push(tile);
            i+=2;
        }
    }
    return { map: map, taverns: taverns };
}


/*
{ game: {
        id: 'deg0lu5e',
        turn: 4,
        maxTurns: 1200,
        heroes: [ [Object], [Object], [Object], [Object] ],
        board:
            { size: 10,
                tiles: '##@1    ####    ' },
        finished: false },
    hero: {
            id: 1,
            name: 'Destroyer',
            userId: 'eke3r302',
            elo: 1200,
            pos: { x: 0, y: 1 },
            lastDir: 'North',
            life: 99,
            gold: 0,
            mineCount: 0,
            spawnPos: { x: 0, y: 1 },
            crashed: false },
    token: 'epid',
    viewUrl: 'http://vindinium.org/deg0lu5e',
    playUrl: 'http://vindinium.org/api/deg0lu5e/epid/play',
    context: {}
}
*/
function bot(state, callback) {

    var map = parseMap(state.game.board, state.hero.id).map;

    function canMoveToTile(x, y) {
        if (x < 0 || x >= map.length) {
            return false;
        }
        if (y < 0 || y >= map.length) {
            return false;
        }
        if (map[y][x] === impassibleWoods) {
            return false;
        }
        return true;
    }

    // x,y is the wrong way round?!
    var dirs = "";
    if (canMoveToTile(state.hero.pos.y, state.hero.pos.x - 1)) {
        dirs += "n";
    }
    if (canMoveToTile(state.hero.pos.y, state.hero.pos.x + 1)) {
        dirs += "s";
    }
    if (canMoveToTile(state.hero.pos.y + 1, state.hero.pos.x)) {
        dirs += "e";
    }
    if (canMoveToTile(state.hero.pos.y - 1, state.hero.pos.x)) {
        dirs += "w";
    }

    var possibilities = dirs.length;

    var i = Math.floor(Math.random() * possibilities);
    var dir = dirs[i];
    callback(null, dir);
};

module.exports = bot;
if (require.main === module) {
	require('vindinium-client').cli(bot);
}

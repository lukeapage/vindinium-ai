function parseMap(board) {
    var size = board.size;
    var tiles = board.tiles;
    var map = [];
    var i = 0;
    for(var y = 0; y < size; y++) {
        var row = [];
        map.push(row);
        for(var x = 0; x < size; x++) {
            row.push(tiles.substr(i, 2));
            i+=2;
        }
    }
    return { map: map };
}

var impassibleWoods = "##";

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

    var map = parseMap(state.game.board).map;

    var above = state.hero.pos.y === 0 ? null : map[state.hero.pos.y - 1][state.hero.pos.x];

    if (above === impassibleWoods) {
        above = null;
    }

    var possibilities = above ? 4 : 3;
    var dirs = above ? 'nesw' : 'esw';

    var i = Math.floor(Math.random() * possibilities);
    var dir = dirs[i];
    callback(null, dir);
};

module.exports = bot;
if (require.main === module) {
	require('vindinium-client').cli(bot);
}

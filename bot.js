


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

    var mapData = parseMap(state.game.board, state.hero.id),
        map = mapData.map;

    var nearestGoldMine = closestPosition(state.hero.pos.y, state.hero.pos.x, mapData.freeGoldMines);
    if (nearestGoldMine) {
        console.log("found gold mine");
        var direction = routeTo({x:state.hero.pos.y, y:state.hero.pos.x}, nearestGoldMine, map);
        if (direction) {
            callback(null, direction);
            return;
        }
    }
    // x,y is the wrong way round?! bug in the node implementation??!
    var dirs = "";
    if (canMoveToTile(map, state.hero.pos.y, state.hero.pos.x - 1, state.hero.life < 40, true) && state.hero.lastDir !== "South") {
        dirs += "n";
    }
    if (canMoveToTile(map, state.hero.pos.y, state.hero.pos.x + 1, state.hero.life < 40, true) && state.hero.lastDir !== "North") {
        dirs += "s";
    }
    if (canMoveToTile(map, state.hero.pos.y + 1, state.hero.pos.x, state.hero.life < 40, true) && state.hero.lastDir !== "West") {
        dirs += "e";
    }
    if (canMoveToTile(map, state.hero.pos.y - 1, state.hero.pos.x, state.hero.life < 40, true) && state.hero.lastDir !== "East") {
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

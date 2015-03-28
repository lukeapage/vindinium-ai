var common = require("../src/common");
var parseMap = require("../src/map");
var routeTo = require("../src/routeTo");

function nearestDirection(heroPosition, map, places) {
    var sortedPlaces = common.sortPositionsByDistance(heroPosition, places);
    for(var i = 0; i < sortedPlaces.length; i++) {
        var direction = routeTo(heroPosition, sortedPlaces[i].position, map);
        if (direction) {
            return direction;
        }
    }
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

    var mapData = parseMap(state.game.board, state.hero.id),
        map = mapData.map,
        heroPosition = {x: state.hero.pos.y, y: state.hero.pos.x};

    if (state.hero.life < 40) {
        var dir = nearestDirection(heroPosition, map, mapData.taverns);
        if (dir) {
            callback(null, dir);
            return;
        }
    }

    var dir = nearestDirection(heroPosition, map, mapData.freeGoldMines);
    if (dir) {
        callback(null, dir);
        return;
    }

    var dir = nearestDirection(heroPosition, map, mapData.taverns);
    if (dir) {
        callback(null, dir);
        return;
    }

    var dirs = "";
    if (common.canMoveToTile(map, state.hero.pos.y, state.hero.pos.x - 1, state.hero.life < 40, true) && state.hero.lastDir !== "South") {
        dirs += "n";
    }
    if (common.canMoveToTile(map, state.hero.pos.y, state.hero.pos.x + 1, state.hero.life < 40, true) && state.hero.lastDir !== "North") {
        dirs += "s";
    }
    if (common.canMoveToTile(map, state.hero.pos.y + 1, state.hero.pos.x, state.hero.life < 40, true) && state.hero.lastDir !== "West") {
        dirs += "e";
    }
    if (common.canMoveToTile(map, state.hero.pos.y - 1, state.hero.pos.x, state.hero.life < 40, true) && state.hero.lastDir !== "East") {
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

var common = require("./common");
var parseMap = require("./map");
var routeTo = require("./route-to");
var getRandomMove = require("./random-move");
var getEnemyData = require("./enemy-data");

function nearestDirection(heroPosition, map, places) {
    var sortedPlaces = common.sortPositionsByCrowDistance(heroPosition, places);
    for(var i = 0; i < sortedPlaces.length; i++) {
        var route = routeTo(heroPosition, sortedPlaces[i].position, map);
        if (route) {
            return route.initialDir;
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

    var enemyData = getEnemyData(mapData, state.game.heroes);

    if (enemyData.sortedByGoldMine.length > 0 && enemyData.sortedByGoldMine[0].goldMines.count > 1 &&
        enemyData.sortedByGoldMine[0].enemyStats.life < state.hero.life) {
        var enemyPosition = enemyData.sortedByGoldMine[0].position;

        // are they close with low health
        if (common.distance(heroPosition, enemyPosition) < 5) {
            var route = routeTo(heroPosition, enemyPosition, map);
            if (route && route.distance < 6) {
                callback(null, route.initialDir);
                return;
            }
        }
    }

    if (state.hero.life < 35) {
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

    dir = getRandomMove(map, heroPosition);

    callback(null, dir);
};

module.exports = bot;
if (require.main === module) {
	require('vindinium-client').cli(bot);
}

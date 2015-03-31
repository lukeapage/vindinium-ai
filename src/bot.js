var common = require("./common");
var parseMap = require("./map");

var getRandomMove = require("./random-move");
var getEnemyData = require("./enemy-data");
var strategyKillEnemy = require("./strategy-kill-enemy");
var strategyHeal = require("./strategy-heal");
var strategyGetGoldMine = require("./strategy-get-gold-mine");

function bot(state, callback) {

    var mapData = parseMap(state.game.board, state.hero.id),
        map = mapData.map,
        heroPosition = {x: state.hero.pos.y, y: state.hero.pos.x};

    var enemyData = getEnemyData(mapData, state.game.heroes);

    var possibilities = strategyKillEnemy(mapData, enemyData, heroPosition, state).concat(
        strategyHeal(mapData, enemyData, heroPosition, state),
        strategyGetGoldMine(mapData, enemyData, heroPosition, state)
        ).sort(function(a, b) {
            if (a.score < b.score) {
                return 1;
            } else if (a.score > b.score) {
                return -1;
            }
            return 0;
        });

    if (possibilities.length) {
        callback(null, possibilities[0].dir);
        return;
    }

    dir = getRandomMove(map, heroPosition);

    callback(null, dir);
};

module.exports = bot;
if (require.main === module) {
	require('vindinium-client').cli(bot);
}

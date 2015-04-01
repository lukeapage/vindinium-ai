/// <reference path='../typings/node/node.d.ts' />
/// <reference path='../typings/vindinium/vindinium.d.ts' />

import parseMap = require("./map");
import routeTo = require("./route-to");
import getEnemyData = require("./enemy-data");
import strategyKillEnemy = require("./strategy-kill-enemy");
import strategyHeal = require("./strategy-heal");
import strategyGetGoldMine = require("./strategy-get-gold-mine");
import getRandomMove = require("./random-move");

function bot(state: VState, callback) : void {

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

    var dir = getRandomMove(map, heroPosition);

    callback(null, dir);
}

export = bot;

if (require.main === module) {
	require('vindinium-client').cli(bot);
}

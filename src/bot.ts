/// <reference path='../typings/node/node.d.ts' />
/// <reference path='../typings/vindinium/vindinium.d.ts' />

import map = require("./map");
import routeTo = require("./route-to");
import enemyData = require("./enemy-data");
import strategyType = require("./strategy-type");
import strategyKillEnemy = require("./strategy-kill-enemy");
import strategyHeal = require("./strategy-heal");
import strategyGetGoldMine = require("./strategy-get-gold-mine");
import getRandomMove = require("./random-move");

function bot(state: VState, callback) : void {

    var mapData : map.MapData = map.parseMap(state.game.board, state.hero.id),
        heroPosition : VPosition = {x: state.hero.pos.y, y: state.hero.pos.x};

    var parsedEnemyData : enemyData.EnemyData = enemyData.parseEnemyData(mapData, state.game.heroes);

    var possibilities : strategyType.StrategyResult[] = strategyKillEnemy(mapData, parsedEnemyData, heroPosition, state).concat(
        strategyHeal(mapData, parsedEnemyData, heroPosition, state),
        strategyGetGoldMine(mapData, parsedEnemyData, heroPosition, state)
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

    var dir = getRandomMove(mapData.map, heroPosition);

    callback(null, dir);
}

export = bot;

if (require.main === module) {
	require('vindinium-client').cli(bot);
}

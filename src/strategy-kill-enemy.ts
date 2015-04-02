import common = require("./common");
import routeTo = require("./route-to");
import map = require("./map");
import enemyData = require("./enemy-data");
import strategyType = require("./strategy-type");

function strategyKillEnemy(mapData : map.MapData, enemyData : enemyData.EnemyData, heroPosition : VPosition, state : VState): strategyType.StrategyResult[] {
    if (enemyData.sortedByGoldMine.length > 0 && enemyData.sortedByGoldMine[0].goldMines.count > 1 &&
        enemyData.sortedByGoldMine[0].enemyStats.life < state.hero.life) {
        var enemyPosition = enemyData.sortedByGoldMine[0].position;

        // are they close with low health
        if (common.distance(heroPosition, enemyPosition) < 5) {
            var route = routeTo(heroPosition, enemyPosition, mapData.map);
            if (route && route.distance < 6) {
                return [{score: 90, dir: route.initialDir}];
            }
        }
    }
    return [];
}

export = strategyKillEnemy;
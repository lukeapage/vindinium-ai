import common = require("./common");
import nearestDirection = require("./nearest-direction");
import map = require("./map");
import enemyData = require("./enemy-data");
import strategyType = require("./strategy-type");

function strategyHeal(mapData : map.MapData, enemyData : enemyData.EnemyData, heroPosition : VPosition, state : VState): strategyType.StrategyResult[] {
    var route = nearestDirection(heroPosition, mapData.map, mapData.taverns);
    if (route) {
        return [{score: (100 - state.hero.life) + 20 + Math.min(0, 10 - route.moves), dir: route.initialDir}];
    }
    return [];
}

export = strategyHeal;
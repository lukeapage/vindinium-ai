import common = require("./common");
import nearestDirection = require("./nearest-direction");
import MapData = require("./map-data");

function strategyHeal(mapData : MapData, enemyData : EnemyData, heroPosition : VPosition, state : VState) {
    var route = nearestDirection(heroPosition, mapData.map, mapData.taverns);
    if (route) {
        return [{score: (100 - state.hero.life) + 20 + Math.min(0, 10 - route.moves), dir: route.initialDir}];
    }
    return [];
}

export = strategyHeal;
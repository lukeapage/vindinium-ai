import common = require("./common");
import nearestDirection = require("./nearest-direction");
import MapData = require("./map-data");

function strategyGetGoldMine(mapData : MapData, enemyData : EnemyData, heroPosition : VPosition, state : VState) {
    var route = nearestDirection(heroPosition, mapData.map, mapData.freeGoldMines);
    if (route) {
        var canSurvive = state.hero.life - (20 + route.moves);
        return [{score: canSurvive ? 50 : 0, dir: route.initialDir}];
    }
}

export = strategyGetGoldMine;
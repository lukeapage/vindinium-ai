import common = require("./common");
import nearestDirection = require("./nearest-direction");
import map = require("./map");
import enemyData = require("./enemy-data");
import strategyType = require("./strategy-type");

function strategyGetGoldMine(mapData : map.MapData, enemyData : enemyData.EnemyData, heroPosition : VPosition, state : VState) : strategyType.StrategyResult[] {
    var route = nearestDirection(heroPosition, mapData.map, mapData.freeGoldMines);
    if (route) {
        var canSurvive = state.hero.life - (20 + route.moves);
        return [{score: canSurvive ? 50 : 0, dir: route.initialDir}];
    }
}

export = strategyGetGoldMine;
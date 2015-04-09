import common = require("./common");
import routeTo = require("./route-to");
import strategyType = require("./strategy-type");
import TurnState = require("./turn-state");

function strategyKillEnemy(turnState : TurnState.TurnState): strategyType.StrategyResult[] {
    var sortedByGoldMine = turnState.stats.enemiesSortedByGoldMine
    if (sortedByGoldMine.length > 0 && sortedByGoldMine[0].goldMines.count > 1 &&
        sortedByGoldMine[0].enemyStats.life < turnState.hero.life) {
        var enemyPosition = sortedByGoldMine[0].position;

        // are they close with low health
        if (common.distance(turnState.hero.pos, enemyPosition) < 5) {
            var route = routeTo(turnState.hero.pos, enemyPosition, turnState.map);
            if (route && route.distance < 6) {
                return [{score: 90, dir: route.initialDir}];
            }
        }
    }
    return [];
}

export = strategyKillEnemy;
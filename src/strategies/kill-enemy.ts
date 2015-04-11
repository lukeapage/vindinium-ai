import common = require("../common");
import strategyType = require("../strategy-type");
import turnState = require("../turn-state");

function strategyKillEnemy(state : turnState.TurnState): strategyType.StrategyResult[] {
    for(var i = 0; i < state.enemyList.length; i++) {
        var enemy = state.enemyList[i];
        if (enemy.goldMines.count > 0 && enemy.enemyStats.life < state.hero.life) {
            var routeToEnemy = state.routeTo(state.hero.pos, enemy.position);

            if (!routeToEnemy) { continue; }

            var enemyRouteToTavern = state.nearestDirection(enemy.position, state.places.taverns);
            var routeToTavern;

            if (enemyRouteToTavern) {
                routeToTavern = state.routeTo(state.hero.pos, enemyRouteToTavern.positionTo);
            }

            var movesToTavern = routeToTavern ? routeToTavern.moves : Infinity;
            var enemyMovesToTavern = enemyRouteToTavern ? enemyRouteToTavern.moves : Infinity;

            var closeness = Math.max(100, ((6 * enemy.goldMines.count) - routeToEnemy.moves) * 20);
            var weAreCloserToTavern = movesToTavern <= enemyMovesToTavern ? 100 : enemy.enemyStats.crashed ? 100 : 0;

            return [{score: (closeness + weAreCloserToTavern) / 2, dir: routeToEnemy.initialDir}];
        }
    }
    return [];
}

export = strategyKillEnemy;
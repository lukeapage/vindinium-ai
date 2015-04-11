import common = require("../common");
import strategyType = require("../strategy-type");
import TurnState = require("../turn-state");

function strategyKillEnemy(turnState : TurnState.TurnState): strategyType.StrategyResult[] {
    for(var i = 0; i < turnState.enemyList.length; i++) {
        var enemy = turnState.enemyList[i];
        if (enemy.goldMines.count > 0 && enemy.enemyStats.life < turnState.hero.life) {
            var routeToEnemy = turnState.routeTo(turnState.hero.pos, enemy.position);

            if (!routeToEnemy) { continue; }

            var enemyRouteToTavern = turnState.nearestDirection(enemy.position, turnState.places.taverns);
            var routeToTavern;

            if (enemyRouteToTavern) {
                routeToTavern = turnState.routeTo(turnState.hero.pos, enemyRouteToTavern.positionTo);
            }

            var movesToTavern = routeToTavern ? routeToTavern.moves : Infinity;
            var enemyMovesToTavern = enemyRouteToTavern ? enemyRouteToTavern.moves : Infinity;

            var closeness = (6 - routeToEnemy.moves) * 20;
            var weAreCloserToTavern = movesToTavern <= enemyMovesToTavern ? 100 : enemy.enemyStats.crashed ? 100 : 0;

            return [{score: (closeness + weAreCloserToTavern) / 2, dir: routeToEnemy.initialDir}];
        }
    }
    return [];
}

export = strategyKillEnemy;
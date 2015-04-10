import common = require("../common");
import routing = require("../routing");
import strategyType = require("../strategy-type");
import TurnState = require("../turn-state");
import nearestDirection = require("../nearest-direction");

function strategyKillEnemy(turnState : TurnState.TurnState): strategyType.StrategyResult[] {
    for(var i = 0; i < turnState.enemyList.length; i++) {
        var enemy = turnState.enemyList[i];
        if (enemy.goldMines.count > 0 && enemy.enemyStats.life < turnState.hero.life) {
            var routeToEnemy = routing.to(turnState.hero.pos, enemy.position, turnState.map);

            if (!routeToEnemy) { continue; }

            var enemyRouteToTavern = nearestDirection(enemy.position, turnState.map, turnState.places.taverns);
            var routeToTavern;

            if (enemyRouteToTavern) {
                routeToTavern = routing.to(turnState.hero.pos, enemyRouteToTavern.positionTo, turnState.map);
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
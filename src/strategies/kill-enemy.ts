import strategyType = require("../strategy-type");
import turnState = require("../turn-state");
import routing = require("../routing");

function strategyKillEnemy(state : turnState.ITurnState) : strategyType.IStrategyResult[] {
    for (var i = 0; i < state.enemyList.length; i++) {
        var enemy = state.enemyList[i];

        if (enemy.isTagTeam) {
            continue;
        }

        if (enemy.goldMines.count > 0 && enemy.life < state.hero.life) {
            var routeToEnemy = state.routeTo(state.hero.pos, enemy.position);

            if (!routeToEnemy) { continue; }

            // todo is not moving to block enemy
            //      is too keen at attacking enemy when mines are near by
            //      should work out if they can get away - or store if a hero is successful at running away

            // instead of chasing, assume that enemy will head towards a tavern
            // if we are closer to tavern
            //   if the distance to the enemy is 1
            //     that means we killed the enemy a bit. assume it moves towards a tavern
            //     work out enemy best route to tavern
            //     preference that direction
            //   else if the distance to the enemy is > 1
            //       preference a direction that keeps us closest to a tavern

            var enemyRouteFromSpawnPos = state.routeTo(enemy.position, enemy.spawnPos);
            var enemyMovesFromSpawnPos = enemyRouteFromSpawnPos ? enemyRouteFromSpawnPos.moves : Infinity;

            if (enemyMovesFromSpawnPos <= 1) {
                continue;
            }

            var enemyRouteToTavern = state.nearestDirection(enemy.position, state.places.taverns);
            var routeToTavern : routing.IRoute;

            if (enemyRouteToTavern) {
                routeToTavern = state.routeTo(state.hero.pos, enemyRouteToTavern.positionTo);
            }

            var movesToTavern = routeToTavern ? routeToTavern.moves : Infinity;
            var enemyMovesToTavern = enemyRouteToTavern ? enemyRouteToTavern.moves : Infinity;

            var closeness = Math.max(100, ((6 * 1/*enemy.goldMines.count*/) - routeToEnemy.moves) * 20);
            var weAreCloserToTavern = movesToTavern <= enemyMovesToTavern ? 100 :
                enemyMovesToTavern === 1 ? -100 :
                    enemy.crashed ? 100 : 0;

            return [{score: (closeness + weAreCloserToTavern) / 2, dir: routeToEnemy.initialDir}];
        }
    }
    return [];
}

export = strategyKillEnemy;

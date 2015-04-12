import strategyType = require("../strategy-type");
import turnState = require("../turn-state");
import routing = require("../routing");
import common = require("../common");

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
            var weAreCloserToTavern = movesToTavern <= enemyMovesToTavern;

            var directionToKillEnemy = routeToEnemy.initialDir;

            if (routeToEnemy.moves === 1) {
                directionToKillEnemy = "";
            }
            else if (routeToTavern && routeToEnemy.moves === 2) {
                //   else if the distance to the enemy is > 1
                //       preference a direction that keeps us closest to a tavern
                var directionOptions : strategyType.IStrategyResult[] = [];
                common.allDirections(function (dx : number, dy : number, dir : string) : void {
                    var x = state.hero.pos.x + dx,
                        y = state.hero.pos.y + dy,
                        pos = {x: x, y: y};
                    if (!dir || common.canMoveToTile(state.map, x, y)) {

                        var routeToTavernNow = state.routeTo(pos, enemyRouteToTavern.positionTo,
                            { excludeHero: String(state.hero.id) });
                        var routeToEnemyNow = state.routeTo(pos, enemy.position,
                            { excludeHero: String(state.hero.id) });

                        // todo: don't see how this can be null, but it happens
                        var movesToTavernNow = routeToTavernNow ? routeToTavernNow.moves : Infinity;
                        var movesToEnemyNow = routeToEnemyNow ? routeToEnemyNow.moves : Infinity;

                        var distanceToEnemyDiff = movesToEnemyNow - routeToEnemy.moves;
                        var distanceToTavernDiff = movesToTavernNow - movesToTavern;
                        var score = (distanceToEnemyDiff * 1) + (distanceToTavernDiff * 2);

                        // console.log(" option - " + dir + " - " + score);
                        directionOptions.push({ dir: dir, score: score });
                    }
                }, true);
                directionOptions.sort(function(a : strategyType.IStrategyResult, b : strategyType.IStrategyResult) : number {
                    if (a.score < b.score) {
                        return -1;
                    } else if (a.score > b.score) {
                        return 1;
                    }
                    return 0;
                });
                if (directionOptions.length) {
                    directionToKillEnemy = directionOptions[0].dir;
                }
            }

            var closenessScore = Math.max(100, (6 - routeToEnemy.moves) * 20);
            var liklihoodOfSuccessScore = weAreCloserToTavern ? 100 :
                enemyMovesToTavern === 1 ? -100 :
                    enemy.crashed ? 100 : 0;
            var score = ((closenessScore + liklihoodOfSuccessScore) / 2) + enemy.goldMines.count;

            console.log("kill enemy - " + (score) + " - " + directionToKillEnemy);
            return [{score: score, dir: directionToKillEnemy}];
        }
    }
    return [];
}

export = strategyKillEnemy;

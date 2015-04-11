import common = require("../common");
import strategyType = require("../strategy-type");
import turnState = require("../turn-state");

function strategyRunAway(state : turnState.TurnState): strategyType.StrategyResult[] {

    var returnStrategies = [];
    if (state.hero.mineCount === 0) { return returnStrategies; }

    // TODO: or if we are closer to a free mine now than the start position (do with score?)
    // TODO: or multiple enemies, but with combined higher health

    // TODO: if a tavern is further away than re-spawning and re-capturing mine, then die!

    for(var i = 0; i < state.enemyList.length; i++) {
        var enemy = state.enemyList[i];
        if (enemy.enemyStats.life > state.hero.life) {

            var routeToEnemy = state.routeTo(state.hero.pos, enemy.position);

            if (!routeToEnemy || routeToEnemy.moves > 2) { continue; }

            var forbiddenDirections = [];
            if (routeToEnemy.moves === 1) {
                forbiddenDirections.push(routeToEnemy.initialDir);
                forbiddenDirections.push("");
            } else {
                if (state.hero.pos.y > enemy.position.y) {
                    forbiddenDirections.push("n");
                } else if (state.hero.pos.y < enemy.position.y) {
                    forbiddenDirections.push("s");
                }
                if (state.hero.pos.x > enemy.position.x) {
                    forbiddenDirections.push("w");
                } else if (state.hero.pos.x < enemy.position.x) {
                    forbiddenDirections.push("e");
                }
            }

            common.allDirections(function(x, y, dir) {
                if (forbiddenDirections.indexOf(dir) < 0) {
                    if (!dir || common.canMoveToTile(state.map, state.hero.pos.x + x, state.hero.pos.y + y, true)) {
                        returnStrategies.push({ score: dir ? 200 : 199, dir: dir });
                    }
                }
            }, true);

        }
    }
    return returnStrategies;
}

export = strategyRunAway;
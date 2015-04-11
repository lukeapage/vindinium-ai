import common = require("../common");
import strategyType = require("../strategy-type");
import turnState = require("../turn-state");

function strategyRunAway(state : turnState.TurnState): strategyType.StrategyResult[] {

    var returnDirections = [];
    if (state.hero.mineCount === 0) { return returnDirections; }

    // TODO: or if we are closer to a free mine now than the start position (do with score?)
    // TODO: or multiple enemies, but with combined higher health

    for(var i = 0; i < state.enemyList.length; i++) {
        var enemy = state.enemyList[i];
        if (enemy.enemyStats.life > state.hero.life) {
            var routeToEnemy = state.routeTo(state.hero.pos, enemy.position);

            if (routeToEnemy.moves > 2) { continue; }

            var forbiddenDirections = [];
            if (routeToEnemy.moves === 1) {
                forbiddenDirections.push(routeToEnemy.initialDir);
                forbiddenDirections.push("");
            } else {
                if (state.hero.pos.y > enemy.position.y) {
                    forbiddenDirections.push("s");
                } else if (state.hero.pos.y < enemy.position.y) {
                    forbiddenDirections.push("n");
                }
                if (state.hero.pos.x > enemy.position.x) {
                    forbiddenDirections.push("w");
                } else if (state.hero.pos.x < enemy.position.x) {
                    forbiddenDirections.push("e");
                }
            }

            common.allDirections(function(x, y, dir) {
                if (forbiddenDirections.indexOf(dir) < 0) {
                    if (!dir || common.canMoveToTile(state.map, x, y, true)) {
                        returnDirections.push({ score: 200, dir: dir });
                    }
                }
            }, true);

        }
    }
    return returnDirections;
}

export = strategyRunAway;
import common = require("../common");
import strategyType = require("../strategy-type");
import turnState = require("../turn-state");

function strategyRunAway(state : turnState.ITurnState) : strategyType.IStrategyResult[] {

    var returnStrategies : strategyType.IStrategyResult[] = [];
    if (state.hero.mineCount === 0) { return returnStrategies; }

    // todo: or if we are closer to a free mine now than the start position (do with score?)
    // todo: or multiple enemies, but with combined higher health
    // todo: if a tavern is further away than re-spawning and re-capturing mine, then die!

    for (var i = 0; i < state.enemyList.length; i++) {
        var enemy = state.enemyList[i];
        if (enemy.life > state.hero.life || state.hero.life < 21) {

            var routeToEnemy = state.routeTo(state.hero.pos, enemy.position);

            if (!routeToEnemy || routeToEnemy.moves > 3) {
                continue;
            }
            if (routeToEnemy.moves === 2 && enemy.life <= 20) { continue; } // we should move and kill it probably
            if (enemy.isTagTeam && routeToEnemy.moves === 2) { continue; } // ignore tag team member unless next to

            var forbiddenDirections : string[] = [];
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

            common.allDirections(function(x : number, y : number, dir : string) : void {
                if (forbiddenDirections.indexOf(dir) < 0) {
                    if (!dir || common.canMoveToTile(state.map, state.hero.pos.x + x, state.hero.pos.y + y, { taverns: true })) {
                        var score = dir ? 200 : 199;
                        // console.log("run away - " + score + " - " + dir);
                        returnStrategies.push({ score: score, dir: dir });
                    }
                }
            }, true);

        }
    }
    return returnStrategies;
}

export = strategyRunAway;

import turnState = require("../turn-state");
import strategyType = require("../strategy-type");

function strategyGetGoldMine(state : turnState.ITurnState) : strategyType.IStrategyResult[] {

    // todo prioritise goldmines next to each other?
    //      prioritise goldmines next to taverns?
    //      prioritise free goldmines vs enemy goldmines

    var potentiolGoldMines = [].concat(state.places.freeGoldMines);
    var results : strategyType.IStrategyResult[] = [];
    var i : number;

    for (i = 0; i < state.enemyList.length; i++) {
        var enemy = state.enemyList[i];
        if (enemy.isTagTeam) { continue; }
        potentiolGoldMines = potentiolGoldMines.concat(enemy.goldMines.positions);
    }

    for (i = 0; i < potentiolGoldMines.length; i++) {
        var goldMinePos = potentiolGoldMines[i];
        var route = state.routeTo(state.hero.pos, goldMinePos);
        var closerToMe = 0;
        if (route) {
            var canSurvive = state.hero.life - (20 + route.moves) > 0;

            var myMovesGeneralised = Math.round(route.moves / 5);
            for (var j = 0; j < state.enemyList.length; j++) {
                var routeToEnemy = state.routeTo(enemy.position, goldMinePos);
                if (routeToEnemy) {
                    // generalise the moves so that it doesn't flip-flop when an enemy moves away or towards one
                    var enemyMovesGeneralised = Math.round(routeToEnemy.moves / 5);
                    if (enemyMovesGeneralised > myMovesGeneralised) {
                        closerToMe++;
                    } else {
                        closerToMe--;
                    }
                }
            }

            if (canSurvive) {
                // var closeness = Math.max(100, ((6 * 1/*enemy.goldMines.count*/) - route.moves) * 20) / 2;
                // console.log("get gold mine - " + (50 + closeness) + " - " + route.initialDir);
                results.push({score: 100 + closerToMe - route.moves, dir: route.initialDir});
            }
        }
    }
    return results;
}

export = strategyGetGoldMine;

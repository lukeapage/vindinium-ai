import turnState = require("../turn-state");
import strategyType = require("../strategy-type");

function strategyGetGoldMine(state : turnState.ITurnState) : strategyType.IStrategyResult[] {

    // todo prioritise goldmines next to each other?
    //      prioritise goldmines next to taverns?
    //      prioritise free goldmines vs enemy goldmines

    var potentiolGoldMines = [].concat(state.places.freeGoldMines);

    for (var i = 0; i < state.enemyList.length; i++) {
        var enemy = state.enemyList[i];
        if (enemy.isTagTeam) { continue; }
        potentiolGoldMines = potentiolGoldMines.concat(enemy.goldMines.positions);
    }

    var route = state.nearestDirection(state.hero.pos, potentiolGoldMines);
    if (route) {
        var canSurvive = state.hero.life - (20 + route.moves) > 0;

        if (canSurvive) {
            var closeness = Math.max(100, ((6 * 1/*enemy.goldMines.count*/) - route.moves) * 20) / 2;
            console.log("get gold mine - " + (50 + closeness) + " - " + route.initialDir);
            return [{score: 50 + closeness, dir: route.initialDir}];
        }
    }
    return [];
}

export = strategyGetGoldMine;

import common = require("../common");
import turnState = require("../turn-state");
import strategyType = require("../strategy-type");

function strategyGetGoldMine(state : turnState.TurnState) : strategyType.StrategyResult[] {

    //TODO prioritise goldmines next to each other?
    //     prioritise goldmines next to taverns?
    //     prioritise free goldmines vs enemy goldmines

    var route = state.nearestDirection(state.hero.pos, state.places.freeGoldMines);
    if (route) {
        var canSurvive = state.hero.life - (20 + route.moves);

        return [{score: canSurvive > 0 ? 50 : 0, dir: route.initialDir}];
    }
    return [];
}

export = strategyGetGoldMine;
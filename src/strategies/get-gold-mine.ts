import common = require("../common");
import TurnState = require("../turn-state");
import strategyType = require("../strategy-type");

function strategyGetGoldMine(turnState : TurnState.TurnState) : strategyType.StrategyResult[] {

    //TODO prioritise goldmines next to each other?
    //     prioritise goldmines next to taverns?
    //     prioritise free goldmines vs enemy goldmines

    var route = turnState.nearestDirection(turnState.hero.pos, turnState.places.freeGoldMines);
    if (route) {
        var canSurvive = turnState.hero.life - (20 + route.moves);

        return [{score: canSurvive > 0 ? 50 : 0, dir: route.initialDir}];
    }
    return [];
}

export = strategyGetGoldMine;
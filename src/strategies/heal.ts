import common = require("../common");
import strategyType = require("../strategy-type");
import TurnState = require("../turn-state");

function strategyHeal(turnState : TurnState.TurnState): strategyType.StrategyResult[] {
    var route = turnState.nearestDirection(turnState.hero.pos, turnState.places.taverns);
    if (route) {
        //var score = (100 - turnState.hero.life) + 20 + Math.min(0, 10 - route.moves);
        return [{score: 45, dir: route.initialDir}];
    }
    return [];
}

export = strategyHeal;
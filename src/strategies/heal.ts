import common = require("../common");
import nearestDirection = require("../nearest-direction");
import strategyType = require("../strategy-type");
import TurnState = require("../turn-state");

function strategyHeal(turnState : TurnState.TurnState): strategyType.StrategyResult[] {
    var route = nearestDirection(turnState.hero.pos, turnState.map, turnState.places.taverns);
    if (route) {
        return [{score: (100 - turnState.hero.life) + 20 + Math.min(0, 10 - route.moves), dir: route.initialDir}];
    }
    return [];
}

export = strategyHeal;
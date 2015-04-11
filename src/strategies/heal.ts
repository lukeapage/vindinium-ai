import common = require("../common");
import strategyType = require("../strategy-type");
import turnState = require("../turn-state");

function strategyHeal(state : turnState.TurnState): strategyType.StrategyResult[] {
    var route = state.nearestDirection(state.hero.pos, state.places.taverns);
    if (route) {
        //var score = (100 - turnState.hero.life) + 20 + Math.min(0, 10 - route.moves);
        var tavernClose = route.moves < 2;
        var healthBelowJustRecharged = state.hero.life < 97;
        var score = tavernClose && healthBelowJustRecharged ? 200 : 45;
        return [{score: score, dir: route.initialDir}];
    }
    return [];
}

export = strategyHeal;
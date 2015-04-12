import strategyType = require("../strategy-type");
import turnState = require("../turn-state");

function strategyHeal(state : turnState.ITurnState) : strategyType.IStrategyResult[] {
    var route = state.nearestDirection(state.hero.pos, state.places.taverns);
    if (route) {
        var tavernClose = route.moves < 2;
        var healthBelowJustRecharged = state.hero.life < 97;
        var score = tavernClose && healthBelowJustRecharged ? 200 : 45;
        console.log("heal - " + (score) + " - " + route.initialDir);
        return [{score: score, dir: route.initialDir}];
    }
    return [];
}

export = strategyHeal;

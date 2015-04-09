import common = require("./common");
import nearestDirection = require("./nearest-direction");
import TurnState = require("./turn-state");
import strategyType = require("./strategy-type");

function strategyGetGoldMine(turnState : TurnState.TurnState) : strategyType.StrategyResult[] {
    var route = nearestDirection(turnState.hero.pos, turnState.map, turnState.places.freeGoldMines);
    if (route) {
        var canSurvive = turnState.hero.life - (20 + route.moves);
        return [{score: canSurvive ? 50 : 0, dir: route.initialDir}];
    }
}

export = strategyGetGoldMine;
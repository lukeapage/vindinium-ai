import common = require("../common");
import strategyType = require("../strategy-type");
import turnState = require("../turn-state");

function strategyRandom(state : turnState.TurnState): strategyType.StrategyResult[] {

    var dirs = "";

    common.allDirections(function(vx, vy, dir) {
        if (common.canMoveToTile(state.map, state.hero.pos.x, state.hero.pos.y, true, true)) {
            dirs += dir;
        }
    });

    var i = Math.floor(Math.random() * dirs.length);
    return [{dir: dirs[i], score: 0}];
}

export = strategyRandom;
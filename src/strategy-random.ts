import common = require("./common");
import strategyType = require("./strategy-type");
import TurnState = require("./turn-state");

function strategyRandom(turnState : TurnState.TurnState): strategyType.StrategyResult[] {

    var dirs = "";

    common.allDirections(function(vx, vy, dir) {
        if (common.canMoveToTile(turnState.map, turnState.hero.pos.x, turnState.hero.pos.y, true, true)) {
            dirs += dir;
        }
    });

    var i = Math.floor(Math.random() * dirs.length);
    return [{dir: dirs[i], score: 0}];
}

export = strategyRandom;
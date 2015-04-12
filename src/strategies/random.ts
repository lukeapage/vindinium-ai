import common = require("../common");
import strategyType = require("../strategy-type");
import turnState = require("../turn-state");

function strategyRandom(state : turnState.ITurnState) : strategyType.IStrategyResult[] {

    var dirs = "";

    common.allDirections(function(vx : number, vy : number, dir : string) : void {
        if (common.canMoveToTile(state.map, state.hero.pos.x, state.hero.pos.y, { taverns: true, goldMines: true })) {
            dirs += dir;
        }
    });

    var i = Math.floor(Math.random() * dirs.length);
    return [{dir: dirs[i], score: 0}];
}

export = strategyRandom;

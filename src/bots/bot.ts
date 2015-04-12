"use strict";

/// <reference path='../../typings/node/node.d.ts' />
/// <reference path='../../typings/vindinium/vindinium.d.ts' />

import strategyKillEnemy = require("../strategies/kill-enemy");
import strategyHeal = require("../strategies/heal");
import strategyGetGoldMine = require("../strategies/get-gold-mine");
import strategyRunAway = require("../strategies/run-away");
import strategyRunner = require("../strategy-runner");

function bot(state : VState, callback : (error : string, direction : string) => void) : void {

    strategyRunner(state, callback, strategyKillEnemy, strategyHeal, strategyGetGoldMine, strategyRunAway);
}

export = bot;

if (require.main === module) {
    /* tslint:disable:no-var-requires */
    require('vindinium-client').cli(bot);
    /* tslint:enable:no-var-requires */
}

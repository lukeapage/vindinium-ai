/// <reference path='../../typings/node/node.d.ts' />
/// <reference path='../../typings/vindinium/vindinium.d.ts' />

import strategyKillEnemy = require("../strategies/kill-enemy");
import strategyHeal = require("../strategies/heal");
import strategyGetGoldMine = require("../strategies/get-gold-mine");
import strategyRunner = require("../strategy-runner");

function bot(state: VState, callback) : void {

    strategyRunner(state, callback, strategyKillEnemy, strategyHeal, strategyGetGoldMine);
}

export = bot;

if (require.main === module) {
	require('vindinium-client').cli(bot);
}

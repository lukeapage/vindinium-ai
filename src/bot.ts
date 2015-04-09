/// <reference path='../typings/node/node.d.ts' />
/// <reference path='../typings/vindinium/vindinium.d.ts' />

import strategyKillEnemy = require("./strategy-kill-enemy");
import strategyHeal = require("./strategy-heal");
import strategyGetGoldMine = require("./strategy-get-gold-mine");
import strategyRunner = require("./strategy-runner");

function bot(state: VState, callback) : void {

    strategyRunner(state, callback, strategyKillEnemy, strategyHeal, strategyGetGoldMine);
}

export = bot;

if (require.main === module) {
	require('vindinium-client').cli(bot);
}
